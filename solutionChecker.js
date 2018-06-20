const solvingMethod = {

  checkHorizontal: (board, y, newPossibleValues) => {
    for (let j = 0; j < board.length; j++) {
      if (board[y][j] !== '') {
        newPossibleValues[board[y][j] - 1] = 0;
      }
    }
  },

  checkVertical: (board, x, newPossibleValues) => {
    for (let i = 0; i < board.length; i++) {
      if (board[i][x] !== '') {
        newPossibleValues[board[i][x] - 1] = 0;
      }
    }
  },

  checkBox: (board, y, x, newPossibleValues) => {
    let boxLength = Math.sqrt(board.length);
    let k = Math.floor(y / boxLength) * boxLength;
    let l = Math.floor(x / boxLength) * boxLength;

    for (let i = k; i < k + boxLength; i++) {
      for (let j = l; j < l + boxLength; j++) {
        if (board[i][j] !== '') {
          newPossibleValues[board[i][j] - 1] = 0;
        }
      }
    }
  },

  findPossibleValues: (board, y, x) => {
    let possibleValues = [];
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
        if (board[i][j] === '') {
          return {
            y: i,
            x: j
          };
        }
      }
    }
    return null;
  },

  tryPossibleValues: (board, currentCell) => {
    if (currentCell === null) {
      return 1;
    }
    let possibleValues = solvingMethod.findPossibleValues(board, currentCell.y, currentCell.x);
    let solutionCount = 0;
    for (let i = 0; i < possibleValues.length; i++) {
      if (possibleValues[i] !== 0) {
        board[currentCell.y][currentCell.x] = possibleValues[i];
        solutionCount += solvingMethod.tryPossibleValues(board, solvingMethod.findEmptyValue(board));
      }
    }
    board[currentCell.y][currentCell.x] = '';
    return solutionCount;
  }
};

module.exports = solvingMethod;
