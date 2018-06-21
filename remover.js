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
    term.black.moveTo(1, 1, '-' + removedNumbers + 'cell');
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
  }
};

module.exports = remover;

// cellRemover(sudokuBoard, collectCoordinates(sudokuBoard), 0);
