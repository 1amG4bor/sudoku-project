// ###===---> Sudoku v0.0.1 <---===###

// npm Packages:
// var tree = require('tree-kit');
var termkit = require('./node_modules/terminal-kit/lib/termkit.js');
var term = termkit.terminal;
let ctx = require('axel');
// OwnPackages
// const mapping = require('./mapping');
const GFX = require('./graphics');
const solvingMethod = require('./solutionChecker');
const remover = require('./remover');
term.windowTitle('>>>   S U D O K U   <<< \t\t v0.1');

// declaration
let board = [];
let clonedBoard = [];
let fixed = [];
let clock = 0;
let myclock;
const startingCellNums = [
  [1, 9, 12],
  [44, 50, 56],
  [60, 90, 120]
];

let gameState = 'inTypeMenu';
let menuIndex = [2, 2];
let cursorState = [0, 0];
let userInput = '';
let userStat = ['', '', '', 'n/a'];

let pressedKey = null;
let startCycle = Date.now();
let isPlay = false;
//      >>>   MAIN THREAD (event handler)   <<<
term.grabInput();
term.on('key', function (key) {
  if (key === 'CTRL_C') { process.exit(); } // Detect CTRL-C and exit 'manually'
  if ((pressedKey !== key) || (key === pressedKey && Date.now() > startCycle + 100)) {
    startCycle = Date.now();
    pressedKey = key;
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
            cursorState[0] = 2;
            cursorState[1] = 0;
            startClock(isPlay = true);
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
          if (fixed[cursorState[0]][cursorState[1]] === ' ' && isPlay === true) {
            gameState = 'editMode';
            // term.green.moveTo(1, 1, 'acces granted!');
          } else {
            // term.red.moveTo(1, 1, 'acces denied! ');
          }
          userInput = board[cursorState[0]][cursorState[1]];
          if (isPlay === false) gameState = 'inTypeMenu';
          break;
        case 'ESCAPE':
          isPlay = false;
          clearInterval(myclock);
          clock = 0;
          gameState = 'inTypeMenu';
          // gameState = 'inGameMenu'
          break;
        case 'C':
        case 'c':
          if (fixed[cursorState[0]][cursorState[1]] === ' ') board[cursorState[0]][cursorState[1]] = ' ';
          break;
        default:
          if (fixed[cursorState[0]][cursorState[1]] === ' ' && isPlay === true) {
            if (key.charCodeAt(0) > 47 && key.charCodeAt(0) < 58) {
              changeUserInput(key);
              saveCellModify();
            }
          }
          break;
      }
    } else if (gameState === 'editMode') {
      switch (key) {
        case 'ENTER':
          saveCellModify();
          gameState = 'inGame';
          break;
        case 'ESCAPE':
          userInput = '';
          gameState = 'inGame';
          break;
        default:
          if (key.charCodeAt(0) > 47 && key.charCodeAt(0) < 58) {
            changeUserInput(key);
          }
          break;
      }
    }
    if (gameState !== 'editMode') reDraw(gameState, menuIndex, cursorState);
    else modifyCell(board, cursorState, userInput);
  }
});

//      >>>   FUNCTIONS   <<<

// Timer
const startClock = () => {
  clock = 0;
  myclock = setInterval(function (isPlay) {
    clock++;
    term.saveCursor();
    userStat[1] = calculateTime(clock);
    term.bgColorRgb(255, 204, 0).black.moveTo(71, 18, userStat[1]);
    term.restoreCursor();
  }, 1000);
};
// Make board
const makeBoard = (menuIndex) => {
  let boardSize;
  if (menuIndex[0] === 1) boardSize = 4;
  else if (menuIndex[0] === 2) boardSize = 9;
  else if (menuIndex[0] === 3) boardSize = 16;
  board = remover.generateEmptyBoard(boardSize);
  board = solvingMethod.generateBoard(board, solvingMethod.findEmptyValue(board));
  clonedBoard = solvingMethod.clone(board);
  remover.cellRemover(board, remover.collectCoordinates(board), 0, (startingCellNums[menuIndex[0] - 1][menuIndex[1] - 1]));
  fixed = solvingMethod.clone(board);
  userStat[2] = remover.freeCellCounter(board).toString();
};

const reDraw = (menu, index, cursor) => {
  console.log('\x1Bc');
  term.hideCursor();
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
      break;
  }
  GFX.drawInfoBar();
  if (menu === 'inGame') {
    GFX.drawMenu(menuIndex[1], clock, userStat[2], userStat[3]);
    GFX.drawCursor(index, cursor, board);
  }
  term.moveTo(3, 28, 'board> ' + board);
  term.moveTo(1, 29, 'C-board> ' + clonedBoard);
  term.moveTo(3, 30, 'fixed> ' + fixed);
  if ((isPlay === false && userStat[2] === '0') && (gameState !== 'inTypeMenu' && gameState !== 'inLevelMenu')) winning();
  ctx.cursor.restore();
};

const modifyCell = (board, cursorState, userInput) => {
  let currentPos = GFX.calcPosition(cursorState[0], cursorState[1], board.length);
  term.moveTo(currentPos[0], currentPos[1]);
  term.setCursorColorRgb(255, 0, 0).red(userInput);
  term.moveTo(currentPos[0], currentPos[1]);
  term.hideCursor(false);
};

const saveCellModify = () => {
  board[cursorState[0]][cursorState[1]] = userInput;
  userInput = '';
  userStat[2] = remover.freeCellCounter(board).toString();
  if (userStat[2] === '0') {
    if (remover.checkSolutionCorrect(board, clonedBoard)) {
      clearInterval(myclock);
      isPlay = false;
    } else gameState = 'inGame';
  }
};

const changeUserInput = (key) => {
  let limit;
  if (board.length > 9) limit = 2;
  else limit = 1;
  if (limit === 1) userInput = key;
  else if (userInput.length === 0) userInput = key;
  else userInput = userInput.slice(userInput.length - 1) + key;
};

const calculateTime = (fullSec) => {
  let time;
  let min, sec;
  min = Math.floor(fullSec / 60);
  sec = fullSec - (min * 60);
  if (sec < 10) time = min + ':0' + sec;
  else time = min + ':' + sec;
  return time;
};

const parseTo1D = (x, y, xLength) => {
  let index = x + ((y * xLength) + 1);
  if (x === 0) index--;
  return index;
};

const winning = () => {
  let background = termkit.ScreenBufferHD.create({ dst: term, width: 30, height: 10 });
  background.fill({ attr: { bgR: 0, bgG: 153, bgB: 153, bgA: 125 } });
  background.x = 20;
  background.y = 5;
  background.draw();
  let background2 = termkit.ScreenBufferHD.create({ dst: term, width: 26, height: 8 });
  background2.fill({ attr: { bgR: 255, bgG: 204, bgB: 0, bgA: 125 } });
  background2.x = 22;
  background2.y = 6;
  background2.draw();

  let congratulation = termkit.ScreenBuffer.create({ dst: term });
  congratulation.put({ x: 28, y: 8, attr: { color: 'black', bgColor: 'red' } }, 'Congratulation');
  congratulation.draw();
  congratulation.put({ x: 28, y: 10, attr: { color: 'black', bgColor: 'red' } }, 'You Win');
  congratulation.draw();
};

// Start the game
reDraw(gameState, menuIndex);

// by FlowAcademy's students: g4bor, Remiee, VarGabi87
