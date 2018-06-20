
const mapping = {
  // Set inner and outer dimension of the gameboard
  setBoard: (cells) => {
    let boardProperies = { 'xSize': 4, 'ySize': 4, 'sectionX': 2, 'sectionY': 2 };
    switch (cells) {
      case 4:
        boardProperies.xSize = 4;
        boardProperies.ySize = 4;
        boardProperies.sectionX = 2;
        boardProperies.sectionY = 2;
        break;
      case 9:
        boardProperies.xSize = 9;
        boardProperies.ySize = 9;
        boardProperies.sectionX = 3;
        boardProperies.sectionY = 3;
        break;
      case 16:
        boardProperies.xSize = 16;
        boardProperies.ySize = 16;
        boardProperies.sectionX = 4;
        boardProperies.sectionY = 4;
        break;
    }
    //
    // easy
    //
    return boardProperies;
  },

  // Generate the Sudoku table based on the setting
  generateBoard: (setting) => {
    let board = [];
    for (let i = 0; i < setting.ySize; i++) {
      board[i] = [];
      for (let j = 0; j < setting.xSize; j++) board[i][j] = null;
    }
    let backtrack = { 'x': false, 'y': false };
    let laps = { 'inner': 0, 'outer': 0 };
    let temp; // ?
    for (let y = 0; y < setting.ySize; y++) {
      backtrack.y = false;
      laps.outer = 0;
      for (let x = 0; x < setting.xSize; x++) {
        backtrack.x = false;
        laps.inner = 0;
        // mapping.addNewCell(setting, board, y, x, backtrack, laps);
        temp = mapping.validate(setting, board, y, x, laps, laps, backtrack);
        if (!backtrack.x) {
          board[y][x] = temp;
        } else mapping.backtracking(setting, board, y, x, laps, backtrack);
      }
    }
    return board;
  },

  addNewCell: (setting, board, y, x, backtrack, laps) => {
    let possibleValues = [];
    for (let i = 1; i < setting.xSize + 1; i++) possibleValues.push(i);
    let valid = false;
    while (!valid) {
      laps.inner++;
      board[y][x] = possibleValues.splice(mapping.getRandomInt(possibleValues.length) - 1, 1);
      if (y === 0 && x === 0) valid = true;
      else if (mapping.checkBoard(y, x, temp, setting, board)) valid = true;

      if (laps.inner > Math.pow(setting.xSize, 2)) {
        backtrack.x = true;
        if (laps.outer > 10) backtrack.y = true;
        break;
      }
    }
  },

  validate: (setting, board, y, x, laps, backtrack) => {
    let valid = false;
    let temp;
    while (!valid) {
      laps.inner++;
      temp = mapping.getRandomInt(setting.xSize);
      if (y === 0 && x === 0) valid = true;
      else if (mapping.checkBoard(y, x, temp, setting, board)) valid = true;
      if (laps.inner > setting.xSize * setting.ySize) {
        backtrack.x = true;
        if (laps.outer > 10) {
          backtrack.y = true;
        }
        break;
      }
    }
    return temp;
  },

  // Checking the board
  checkBoard: (y, x, temp, setting, board) => {
    // Horizontal checking...
    for (let i = 0; i < x; i++) {
      if (board[y][i] === temp) return false;
    }
    // Vertical checking...
    for (let j = 0; j < y; j++) {
      if (board[j][x] === temp) return false;
    }
    // Area checking...
    for (let k = 0; k < setting.ySize; k++) {
      for (let l = 0; l < setting.xSize; l++) {
        if ((Math.floor(k / setting.sectionY) === Math.floor(y / setting.sectionY)) && (Math.floor(l / setting.sectionX) === Math.floor(x / setting.sectionX))) {
          if (board[k][l] === temp) return false;
        }
      }
    }
    return true;
  },

  // Do backtracking if dead-end happens
  backtracking: (setting, board, y, x, laps, backtrack) => {
    for (let i = 0; i < setting.xSize; i++) board[y][i] = 0;
    y = -1;
    laps.outer++;
    if (backtrack.y) {
      for (let j = y; j > y - 2; j--) {
        for (let i = 0; i < setting.xSize; i++) board[j][i] = 0;
      }
      y -= 2;
    }
  },

  // Generate random number based on the board size
  getRandomInt: (max) => {
    return Math.floor(Math.random() * Math.floor(max)) + 1;
  }

};

module.exports = mapping;

const getBoard = (x, y, board) => {
  return board[y][x];
};
