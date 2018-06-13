// ###===---> Sudoku v0.0.1 <---===###

// npm Packages:
const RLS = require('readline-sync');
const mapping = require('./mapping');
let Array2d = require('array-2d');
let { table } = require('table');

// declaration
let output;
let result = [];

// Make board
let setting = mapping.setBoard(36);
let board = new Array2d(setting.xSize, setting.ySize, 0);
board = mapping.generateBoard(setting);
console.log(board.toString());
// Draw the board
for (let i = 0; i < setting.ySize; i++) {
  result[i] = [];
  for (let j = 0; j < setting.xSize; j++) {
    result[i][j] = board.get(i, j);
  }
}
output = table(result);
console.log(output);

// start test!
let pressedKey;
while (pressedKey !== 'esc') {
  pressedKey = RLS.keyIn(['press any key: ']);
  console.log(pressedKey + ' has pressed!');
}

// console.log('\x1Bc');
