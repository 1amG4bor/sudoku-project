let solvingMethod = require('./solver.js');
let readlineSync = require('readline-sync');
let sudokuBoard = [
  [7, 4, 3, 9, 5, 1, 6, 8, 2],
  [1, 6, 2, 4, 8, 7, 3, 9, 5],
  [9, 5, 8, 6, 3, 2, 7, 1, 4],
  [2, 1, 9, 8, 7, 3, 5, 4, 6],
  [3, 7, 4, 5, 6, 9, 1, 2, 8],
  [5, 8, 6, 1, 2, 4, 9, 7, 3],
  [4, 9, 5, 2, 1, 6, 8, 3, 7],
  [8, 2, 7, 3, 9, 5, 4, 6, 1],
  [6, 3, 1, 7, 4, 8, 2, 5, 9]
];

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

let counter = 0;
while (counter <= n) {
  let y = Math.floor((Math.random() * sudokuBoard.length));
  let x = Math.floor((Math.random() * sudokuBoard.length));

  if (sudokuBoard[y][x] !== 0) {
    let originalValue = sudokuBoard[y][x];
    sudokuBoard[y][x] = 0;
    let numberOfsolution = solvingMethod.tryPossibleValues(sudokuBoard, solvingMethod.findEmptyValue(sudokuBoard));
    if (numberOfsolution !== 1) {
      sudokuBoard[y][x] = originalValue;
    } else {
      counter++;
    }
  }
}
console.log(sudokuBoard);
