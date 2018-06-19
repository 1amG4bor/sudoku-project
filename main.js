// ###===---> Sudoku v0.0.1 <---===###

// npm Packages:
// const readline = require('readline-sync');
const ctx = require('axel');
const GFX = require('./graphics');
// let Delay = require('delay');
let { table } = require('table');
let term = require('terminal-kit').terminal;
// OwnPackeges
const mapping = require('./mapping');
let solvingMethod = require('./solutionChecker.js');
term.windowTitle('S u d o k u \t\t v-0.0.1 \t\t\t\t\t by: FlowAcademy\'s students, author: g4bor, Remiee, VarGabi87');

// declaration
let board = [];
let fixed;

let output;
let result = [];

let pressedKey;
let gameState = 'inTypeMenu';
let menuIndex = [2, 2];
let cursorState = [0, 0];
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
        }
        break;
      case 'ESCAPE':
        if (gameState === 'inLevelMenu') gameState = 'inTypeMenu';
        break;
    }
  } else if (gameState === 'inGame') {
    // Navigate and play on game board!
    let end = board.length;
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

        break;
      case 'ESCAPE':
      gameState = 'inGameMenu';
        break;
      case 'C':

        break;
      case 'H':

        break;
      case 'R':

        break;
    }
  }
  pressedKey = key; // THIS line WILL BE DELETED!
  reDraw(gameState, menuIndex, cursorState);
});

const removeCells = (board, level, fixed) => {
  let cellDecrease = level;
  let removedNumbers = 0;
  while (removedNumbers <= cellDecrease) {
    let y = Math.floor((Math.random() * (board.length - 1)));
    let x = Math.floor((Math.random() * (board.length - 1)));

    if (board[y][x] !== 0) {
      let originalValue = board[y][x];
      board[y][x] = '';
      let i = parseInt((x * (board.length + 1) + y));
      fixed[i].x = null;
      fixed[i].y = null;
      fixed[i].value = null;
      let numberOfsolution = solvingMethod.tryPossibleValues(board, solvingMethod.findEmptyValue(board));
      if (numberOfsolution !== 1) {
        board[y][x] = originalValue;
      } else {
        removedNumbers++;
      }
    }
  }
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
    GFX.drawMenu('', '', '', '');
    GFX.drawCursor(index, cursor, board);
  }
  term.moveTo(1, 1, pressedKey + ' was pressed, menuindex= ' + menuIndex);
  ctx.cursor.restore();
};

// Draw the board
const drawBoard = (gameBoard, setting) => {
  for (let i = 0; i < setting.ySize; i++) {
    result[i] = [];
    for (let j = 0; j < setting.xSize; j++) result[i][j] = gameBoard[i][j];
  }
  output = table(result);
  console.log(output);
};
// Make board
const makeBoard = (menuIndex) => {
  let boardSize = 4;
  if (menuIndex[0] === 1) boardSize = 4;
  else if (menuIndex[0] === 2) boardSize = 9;
  else if (menuIndex[0] === 3) boardSize = 16;
  let setting = mapping.setBoard(boardSize);
  for (let i = 0; i < setting.ySize; i++) {
    board[i] = [];
    for (let j = 0; j < setting.xSize; j++) board[i][j] = 0;
  }
  board = mapping.generateBoard(setting);
  fixed = readFixNums(board);
  removeCells(board, 40, fixed);
  console.log(fixed);
  // console.log('\x1Bc');
  // reDraw(gameState, menuIndex);
};

// Load the game
reDraw(gameState, menuIndex);

// by: FlowAcademy\'s students, author: g4bor, Remiee, VarGabi87'
