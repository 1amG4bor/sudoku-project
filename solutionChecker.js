let sudokuBoard = [
  [8, 6, 0, 0, 2, 0, 0, 0, 0],
  [0, 0, 0, 7, 0, 0, 0, 5, 9],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 6, 0, 8, 0, 0],
  [0, 4, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 5, 3, 0, 0, 0, 0, 7],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 2, 0, 0, 0, 0, 6, 0, 0],
  [0, 0, 7, 5, 0, 9, 0, 0, 0]
];

const checkHorizontal = (board, y, newPossibleValues) => {
  for (let j = 0; j < board.length; j++) {
    if (board[y][j] !== 0) {
      newPossibleValues[board[y][j] - 1] = 0;
    }
  }
  return newPossibleValues;
};

const checkVertical = (board, x, newPossibleValues) => {
  for (let i = 0; i < board.length; i++) {
    if (board[i][x] !== 0) {
      newPossibleValues[board[i][x] - 1] = 0;
    }
  }
  return newPossibleValues;
};

const checkBox = (board, y, x, newPossibleValues) => {
  let k = 0;
  let l = 0;
  if (y >= 0 && y <= 2) {
    k = 0;
  } else if (y >= 3 && y <= 5) {
    k = 3;
  } else {
    k = 6;
  }
  if (x >= 0 && x <= 2) {
    l = 0;
  } else if (x >= 3 && x <= 5) {
    l = 3;
  } else {
    l = 6;
  }
  for (let i = k; i < k + 3; i++) {
    for (let j = l; j < l + 3; j++) {
      if (board[i][j] !== 0) {
        newPossibleValues[board[i][j] - 1] = 0;
      }
    }
  }
  return newPossibleValues;
};

const findPossibleValues = (board, y, x) => {
  let possibleValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  possibleValues = checkHorizontal(board, y, possibleValues);

  possibleValues = checkVertical(board, x, possibleValues);

  possibleValues = checkBox(board, y, x, possibleValues);

  return possibleValues;
};

const findFirstEmptyValue = (board) => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      if (board[i][j] === 0) {
        return {
          y: i,
          x: j
        };
      }
    }
  }
  return false;
};

const solver = (board, currentCell) => {
  if (currentCell === false) {
    return board;
  }

  let possibleValues = findPossibleValues(board, currentCell.y, currentCell.x);

  for (let i = 0; i < possibleValues.length; i++) {
    if (possibleValues[i] !== 0) {
      board[currentCell.y][currentCell.x] = possibleValues[i];

      const solution = solver(board, findFirstEmptyValue(board));
      if (solution !== false) {
        return solution;
      }
    }
  }
  board[currentCell.y][currentCell.x] = 0;
  return false;
};

console.log(solver(sudokuBoard, findFirstEmptyValue(sudokuBoard)));
