const solvingMethod = require('./solutionChecker.js');
const readlineSync = require('readline-sync');
const { table } = require('table');
const mapping = require('./mapping');
const Array2d = require('array-2d');

let setting = mapping.setBoard(81);
let board = new Array2d(setting.xSize, setting.ySize, 0);
board = mapping.generateBoard(setting);
let size = Math.sqrt(board.a.length);

let sudokuBoard = [];
for (let i = 0; i < size; i++) {
  sudokuBoard[i] = [];
  for (let j = 0; j < size; j++) {
    sudokuBoard[i][j] = board.a[j];
  }
  board.a.splice(0, size);
}

let coordinateList = [];
for (let i = 0; i < sudokuBoard.length; i++) {
  for (let j = 0; j < sudokuBoard.length; j++) {
    coordinateList.push({ y: i, x: j, value: sudokuBoard[i][j], tried: false });
  }
}
/*
let n;
let difficulties = ['Easy', 'Medium', 'Hard'];
let difficulty = readlineSync.keyInSelect(difficulties, 'Válassz nehézségi szintet!');
if (difficulty === 0) {
  n = 45;
} else if (difficulty === 1) {
  n = 50;
} else {
  n = 56;
}
*/

const getNumberOfSolutions = (board) => {
  return solvingMethod.calculateNumberOfSolutions(solvingMethod.clone(board), solvingMethod.findEmptyValue(board));
};
/*
let removedNumbers = 0;
while (removedNumbers < 45) {
  let n = Math.floor(Math.random() * coordinateList.length);
  let randomCell = coordinateList[n];

  let originalValue = sudokuBoard[randomCell.y][randomCell.x];
  sudokuBoard[randomCell.y][randomCell.x] = ' ';

  let numberOfSolutions = getNumberOfSolutions(sudokuBoard);
  if (numberOfSolutions === 1) {
    removedNumbers++;
    coordinateList.splice(n, 1);
  } else {
    sudokuBoard[randomCell.y][randomCell.x] = originalValue;
  }
}
console.log(table(sudokuBoard));
*/
let removedNumbers = 0;
let removedCoordinates = [];
const cellRemover = (board, coordinates) => {
  let n = Math.floor(Math.random() * coordinates.length);
  let randomCell = coordinates[n];
  let lastRemovedCell = removedCoordinates[removedCoordinates.length - 1];

  let originalValue = board[randomCell.y][randomCell.x];
  board[randomCell.y][randomCell.x] = ' ';

  let numberOfSolutions = getNumberOfSolutions(board);
  if (numberOfSolutions === 1) {
    removedCoordinates.push(coordinates.splice(n, 1));
    removedNumbers++;
  } else {
    board[randomCell.y][randomCell.x] = originalValue;
    coordinates[n].tried = true;
  }

  let triedAllCell = true;
  for (let i = 0; i < coordinates.length; i++) {
    if (coordinates[i].tried === false) {
      triedAllCell = false;
    }
  }

  if (triedAllCell) {
    console.log(lastRemovedCell.vale);
    board[lastRemovedCell.y][lastRemovedCell.x] = lastRemovedCell.value;
    cellRemover(board, coordinates);
  }

  if (removedNumbers < 60) {
    cellRemover(board, coordinates);
  }
  return board;
};

console.log(table(cellRemover(sudokuBoard, coordinateList)));
