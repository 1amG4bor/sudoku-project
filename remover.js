const solvingMethod = require('./solutionChecker.js');

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

const generateEmptyBoard = (size) => {
  let emptyBoard = [];
  for (let i = 0; i < size; i++) {
    emptyBoard[i] = [];
    for (let j = 0; j < size; j++) {
      emptyBoard[i][j] = ' ';
    }
  }
  return emptyBoard;
};

let emptySudokuBoard = generateEmptyBoard(9);
let sudokuBoard = solvingMethod.generateBoard(emptySudokuBoard, solvingMethod.findEmptyValue(emptySudokuBoard));

let coordinateList = [];
for (let i = 0; i < sudokuBoard.length; i++) {
  for (let j = 0; j < sudokuBoard.length; j++) {
    coordinateList.push({ y: i, x: j });
  }
}

const getNumberOfSolutions = (board) => {
  return solvingMethod.calculateNumberOfSolutions(solvingMethod.clone(board), solvingMethod.findEmptyValue(board));
};

const cellRemover = (board, coordinates, removedNumbers) => {
  if (removedNumbers === 54) {
    return true;
  }

  solvingMethod.shuffle(coordinates);
  for (let i = coordinates.length - 1; i >= 0; i--) {
    let randomCell = coordinates[i];

    let originalValue = board[randomCell.y][randomCell.x];
    board[randomCell.y][randomCell.x] = ' ';

    let numberOfSolutions = getNumberOfSolutions(board);
    if (numberOfSolutions === 1) {
      coordinates.splice(i, 1);
      let finished = cellRemover(board, coordinates, removedNumbers + 1);
      if (finished) {
        return true;
      }
      coordinates.push(randomCell);
    }
    board[randomCell.y][randomCell.x] = originalValue;
  }
  return false;
};

if (cellRemover(sudokuBoard, coordinateList, 0)) {
  console.log(sudokuBoard);
}
