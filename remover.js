const solvingMethod = require('./solutionChecker.js');
const readlineSync = require('readline-sync');
const {table} = require('table');
const mapping = require('./mapping');
const Array2d = require('array-2d');

let setting = mapping.setBoard(81);
let board = new Array2d(setting.xSize, setting.ySize, 0);
board = mapping.generateBoard(setting);

let sudokuBoard = [];
for (let i = 0; i < 9; i++) {
  sudokuBoard[i] = [];
  for (let j = 0; j < 9; j++) {
    sudokuBoard[i][j] = board.a[j];
  }
  board.a.splice(0, 9);
}
/*
let n;
let difficulties = ['Easy', 'Medium', 'Hard'];
let difficulty = readlineSync.keyInSelect(difficulties, 'Válassz nehézségi szintet!');
if (difficulty === 0) {
  n = 45;
} else if (difficulty === 1) {
  n = 54;
} else {
  n = 64;
}
*/
let removedNumbers = 0;
while (removedNumbers < 58) {
  let y = Math.floor(Math.random() * sudokuBoard.length);
  let x = Math.floor(Math.random() * sudokuBoard.length);

  if (sudokuBoard[y][x] !== ' ') {
    let originalValue = sudokuBoard[y][x];
    sudokuBoard[y][x] = ' ';
    let numberOfSolutions = solvingMethod.tryPossibleValues(sudokuBoard, solvingMethod.findEmptyValue(sudokuBoard));
    if (numberOfSolutions !== 1) {
      sudokuBoard[y][x] = originalValue;
    } else {
      removedNumbers++;
    }
  }
}
console.log(table(sudokuBoard));
