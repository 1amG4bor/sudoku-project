const solvingMethod = require('./solutionChecker.js');
let term = require('terminal-kit').terminal;
const remover = {
  generateEmptyBoard: (size) => {
    const emptyBoard = [];
    for (let i = 0; i < size; i++) {
      emptyBoard[i] = [];
      for (let j = 0; j < size; j++) {
        emptyBoard[i][j] = ' ';
      }
    }
    return emptyBoard;
  },

  /*
  const emptySudokuBoard = generateEmptyBoard(9);
  const sudokuBoard = solvingMethod.generateBoard(emptySudokuBoard, solvingMethod.findEmptyValue(emptySudokuBoard));
  const clonedSudokuBoard = solvingMethod.clone(sudokuBoard);
  */

  collectCoordinates: (board) => {
    const coordinateList = [];
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        coordinateList.push({ y: i, x: j });
      }
    }
    return coordinateList;
  },

  getNumberOfSolutions: (board) => {
    return solvingMethod.calculateNumberOfSolutions(solvingMethod.clone(board), solvingMethod.findEmptyValue(board));
  },

  cellRemover: (board, coordinates, removedNumbers, limit) => {
    if (removedNumbers === parseInt(limit)) {
      return true;
    }

    solvingMethod.shuffle(coordinates);
    for (let i = coordinates.length - 1; i >= 0; i--) {
      const randomCell = coordinates[i];

      const originalValue = board[randomCell.y][randomCell.x];
      board[randomCell.y][randomCell.x] = ' ';

      const numberOfSolutions = remover.getNumberOfSolutions(board);
      if (numberOfSolutions === 1) {
        coordinates.splice(i, 1);
        const finished = remover.cellRemover(board, coordinates, removedNumbers + 1, limit);
        if (finished) {
          return true;
        }
        coordinates.push(randomCell);
      }
      board[randomCell.y][randomCell.x] = originalValue;
    }
    return false;
  },

  checkSolutionCorrect: (board, clonedBoard) => {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        if (board[i][j] != clonedBoard[i][j]) {
          return false;
        }
      }
    }
    return true;
  },

  freeCellCounter: (board) => {
    let freeCells = 0;
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        if (board[i][j] === ' ') {
          freeCells++;
        }
      }
    }
    return freeCells;
  }
};

module.exports = remover;

/*
cellRemover(sudokuBoard, collectCoordinates(sudokuBoard), 0);
checkSolutionCorrect(sudokuBoard, clonedSudokuBoard);
if (checkSolutionCorrect) {
  console.log('Congratulations! You solved the puzzle!');
} else {
  console.log(Sorry. You couldn't solve the puzzle. Try again!');
}
*/
