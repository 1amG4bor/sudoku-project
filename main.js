// ###===---> Sudoku v0.0.1 <---===###

// npm Packages:
let ctx = require('axel');
let term = require('terminal-kit').terminal;
// OwnPackeges
const mapping = require('./mapping');
const GFX = require('./graphics');
const solvingMethod = require('./solutionChecker');
const remover = require('./remover');
term.windowTitle('S u d o k u \t\t v-0.0.1 \t\t\t\t\t by: FlowAcademy\'s students, author: g4bor, Remiee, VarGabi87');

// declaration
let board = [];
let fixed;
let timer = 0;

let pressedKey = null;
let gameState = 'inTypeMenu';
let menuIndex = [2, 2];
let cursorState = [0, 0];
let userInput = '';
// FUNCTIONS
term.grabInput();
term.on('key', function (key) {
  if (key === 'CTRL_C') { process.exit(); } // Detect CTRL-C and exit 'manually'
  if (gameState === 'inTypeMenu' || gameState === 'inLevelMenu') {
    // Navigate and make settings in menu!
    switch (key) {
      case 'UP':
        if (gameState === 'inTypeMenu') {
          if (menuIndex[0] > 1) menuIndex[0]--;
        } else {
          if (menuIndex[1] > 1) menuIndex[1]--;
        }
        break;
      case 'DOWN':
        if (gameState === 'inTypeMenu') {
          if (menuIndex[0] < 3) menuIndex[0]++;
        } else {
          if (menuIndex[1] < 3) menuIndex[1]++;
        }
        break;
      case 'ENTER':
        if (gameState === 'inTypeMenu') gameState = 'inLevelMenu';
        else {
          gameState = 'inGame';
          makeBoard(menuIndex);
          cursorState[0] = 0;
          cursorState[1] = 0;
          startClock();
        }
        break;
      case 'ESCAPE':
        if (gameState === 'inLevelMenu') gameState = 'inTypeMenu';
        break;
    }
  } else if (gameState === 'inGame') {
    // Navigate and play on game board!
    let end = board.length - 1;
    switch (key) {
      case 'UP':
        if (cursorState[1] > 0) cursorState[1]--;
        break;
      case 'DOWN':
        if (cursorState[1] < end) cursorState[1]++;
        break;
      case 'LEFT':
        if (cursorState[0] > 0) cursorState[0]--;
        break;
      case 'RIGHT':
        if (cursorState[0] < end) cursorState[0]++;
        break;
      case 'ENTER':
        gameState = 'editMode';
        break;
      case 'ESCAPE':
        gameState = 'inTypeMenu';
        break;
      case 'C':

        break;
      case 'H':

        break;
      case 'R':

        break;
    }
  } else if (gameState === 'editMode') {
    switch (key) {
      case 'ENTER':
        board[cursorState[0]][cursorState[1]] = userInput;
        userInput = '';
        gameState = 'inGame';
        break;
      case 'ESCAPE':
        userInput = '';
        gameState = 'inGame';
        break;
      default:
        term.moveTo(20, 31, 'k> ' + key);
        term.moveTo(25, 31, 'c> ' + key.charCodeAt(0));
        if (key.charCodeAt(0) > 47 && key.charCodeAt(0) < 58) {
          pressedKey = key;
          let limit = 1;
          if (board.length > 9) limit = 2;
          if (userInput.length < limit) userInput += key;
          else userInput = userInput.slice(userInput.length - 1) + key;
        }
        break;
    }
  }
  // pressedKey = key; // THIS line WILL BE DELETED!
  if (gameState !== 'editMode') reDraw(gameState, menuIndex, cursorState);
  else modifyCell(board, cursorState, pressedKey, key);
});

// Timer

const startClock = () => {
  setInterval(setTime, 1000);
}
const setTime = () => {
  timer++;
  reDraw(gameState, menuIndex, cursorState);
}

// Make board
const makeBoard = (menuIndex) => {
  let boardSize;
  if (menuIndex[0] === 1) boardSize = 4;
  else if (menuIndex[0] === 2) boardSize = 9;
  else if (menuIndex[0] === 3) boardSize = 16;
  let setting = mapping.setBoard(boardSize);
  board = remover.generateEmptyBoard(boardSize);
  board = solvingMethod.generateBoard(board, solvingMethod.findEmptyValue(board));
  console.log(board);
  fixed = readFixNums(board);
  remover.cellRemover(board, remover.collectCoordinates(board), 0);
  // need to set numbers for difficulty level
  //console.log(fixed);
};

const readFixNums = (gameBoard) => {
  let fixNums = [];
  for (let j = 0; j < gameBoard.length; j++) {
    for (let i = 0; i < gameBoard.length; i++) {
      if (gameBoard[i][j] !== '') {
        fixNums.push({ 'x': parseInt(i), 'y': parseInt(j), 'value': gameBoard[i][j].toString() });
      }
    }
  }
  return fixNums;
};

const reDraw = (menu, index, cursor) => {
  // console.log('\x1Bc');
  // term.hideCursor();
  ctx.clear();
  GFX.drawInterface();
  switch (menu) {
    case 'inTypeMenu':
      GFX.drawLogo(12, 5);
      GFX.drawChoosePanel();
      GFX.printGametype(index[0]); // options: 1->'2x2', 2->'3x3', 3->'4x4'
      break;
    case 'inLevelMenu':
      GFX.drawLogo(12, 5);
      GFX.drawChoosePanel();
      GFX.printLevel(index[1]); // options: 1-'easy', 2-'med', 3-'hard'
      break;
    case 'inGame':
      GFX.drawGameBoard(board, fixed);
      // GFX.drawChoosePanel();
      break;
  }
  GFX.drawInfoBar();
  // GFX.drawMenu('med', '0:00', '45', '0:42');
  if (menu === 'inGame') {
    GFX.drawMenu(menuIndex[1], timer, '?', 'N/A');
    GFX.drawCursor(index, cursor, board);
  }
  term.moveTo(1, 1, pressedKey + ' was pressed, >menuindex= ' + menuIndex + ' >cursorState= ' + cursorState);
  term.moveTo(1, 31, '> ' + gameState);
  ctx.cursor.restore();
};

const modifyCell = (board, cursorState, pressedKey, key) => {
  term.moveTo(30, 40, '> ' + userInput); // log
  let currentPos = GFX.calcPosition(cursorState[0], cursorState[1], board.length);
  term.moveTo(currentPos[0], currentPos[1]);
  term.bgColorRgb(255, 153, 0).red(pressedKey);
  term.moveTo(currentPos[0], currentPos[1]);
  term.bgColorRgb(0, 0, 0).red(pressedKey);
};

// Load the game
reDraw(gameState, menuIndex);

// by: FlowAcademy\'s students, author: g4bor, Remiee, VarGabi87'
