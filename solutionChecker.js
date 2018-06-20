const solvingMethod = {
  clone: (board) => {
    const clonedBoard = [];
    for (let i = 0; i < board.length; i++) {
      clonedBoard[i] = [];
      for (let j = 0; j < board.length; j++) {
        clonedBoard[i][j] = board[i][j];
      }
    }
    return clonedBoard;
  },

  checkHorizontal: (board, y, newPossibleValues) => {
    for (let j = 0; j < board.length; j++) {
      if (board[y][j] !== ' ') {
        newPossibleValues[board[y][j] - 1] = 0;
      }
    }
  },

  checkVertical: (board, x, newPossibleValues) => {
    for (let i = 0; i < board.length; i++) {
      if (board[i][x] !== ' ') {
        newPossibleValues[board[i][x] - 1] = 0;
      }
    }
  },

  checkBox: (board, y, x, newPossibleValues) => {
    const boxLength = Math.sqrt(board.length);
    const k = Math.floor(y / boxLength) * boxLength;
    const l = Math.floor(x / boxLength) * boxLength;

    for (let i = k; i < k + boxLength; i++) {
      for (let j = l; j < l + boxLength; j++) {
        if (board[i][j] !== ' ') {
          newPossibleValues[board[i][j] - 1] = 0;
        }
      }
    }
  },

  findPossibleValues: (board, y, x) => {
    const possibleValues = [];
    for (let i = 0; i < board.length; i++) {
      possibleValues[i] = i + 1;
    }
    solvingMethod.checkHorizontal(board, y, possibleValues);
    solvingMethod.checkVertical(board, x, possibleValues);
    solvingMethod.checkBox(board, y, x, possibleValues);

    return possibleValues;
  },

  findEmptyValue: (board) => {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        if (board[i][j] === ' ') {
          return {
            y: i,
            x: j
          };
        }
      }
    }
    return null;
  },

  shuffle: (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  },

  calculateNumberOfSolutions: (board, currentCell) => {
    if (currentCell === null) {
      return 1;
    }

    const possibleValues = solvingMethod.findPossibleValues(board, currentCell.y, currentCell.x);

    let solutionCount = 0;
    for (let i = 0; i < possibleValues.length; i++) {
      if (possibleValues[i] !== 0) {
        board[currentCell.y][currentCell.x] = possibleValues[i];

        solutionCount += solvingMethod.calculateNumberOfSolutions(board, solvingMethod.findEmptyValue(board));
        if (solutionCount > 1) {
          return solutionCount;
        }
      }
    }
    board[currentCell.y][currentCell.x] = ' ';
    return solutionCount;
  },

  generateBoard: (board, currentCell) => {
    if (currentCell === null) {
      return board;
    }

    const possibleValues = solvingMethod.findPossibleValues(board, currentCell.y, currentCell.x);
    solvingMethod.shuffle(possibleValues);

    for (let i = 0; i < possibleValues.length; i++) {
      if (possibleValues[i] !== 0) {
        board[currentCell.y][currentCell.x] = possibleValues[i];

        const solution = solvingMethod.generateBoard(board, solvingMethod.findEmptyValue(board));
        if (solution !== null) {
          return solution;
        }
      }
    }
    board[currentCell.y][currentCell.x] = ' ';
    return null;
  }
};

module.exports = solvingMethod;
