let Array2d = require('array-2d');

const mapping = {
  // Set inner and outer dimension of the gameboard
  setBoard: (cells) => {
    let boardProperies = { 'xSize': 4, 'ySize': 4, 'sectionX': 2, 'sectionY': 2 };
    switch (cells) {
      case 16:
        boardProperies.xSize = 4;
        boardProperies.ySize = 4;
        boardProperies.sectionX = 2;
        boardProperies.sectionY = 2;
        break;
      case 36:
        boardProperies.xSize = 6;
        boardProperies.ySize = 6;
        boardProperies.sectionX = 3;
        boardProperies.sectionY = 2;
        break;
      case 81:
        boardProperies.xSize = 9;
        boardProperies.ySize = 9;
        boardProperies.sectionX = 3;
        boardProperies.sectionY = 3;
        break;
    }
    return boardProperies;
  },

  // Generate the Sudoku table based on the setting
  generateBoard: (setting) => {
    let board = new Array2d(setting.xSize, setting.ySize, 0);
    let backtrackX = false;
    let backtrackY = false;
    let outerLaps;
    let temp;
    for (let x = 0; x < setting.xSize; x++) {
      backtrackY = false;
      outerLaps = 0;
      for (let y = 0; y < setting.ySize; y++) {
        backtrackX = false;
        let laps = 0;
        temp = mapping.validate(setting, board, x, y, laps, outerLaps, backtrackX, backtrackY);
        // reOrganize code!!!
        if (!backtrackX) {
          board.set(x, y, temp);
        } else mapping.backtracking(setting, board, x, y, outerLaps, backtrackY);
      }
    }
    return board;
  },

  validate: (setting, board, x, y, laps, outerLaps, backtrackX, backtrackY) => {
    let valid = false;
    let temp;
    while (!valid) {
      laps++;
      temp = mapping.getRandomInt(setting.xSize);
      if (y === 0 && x === 0) valid = true;
      else if (mapping.checkBoard(x, y, temp, setting, board)) valid = true;
      if (laps > setting.xSize * setting.ySize) {
        backtrackX = true;
        if (outerLaps > 10) {
          backtrackY = true;
        }
        break;
      }
    }
    return temp;
  },

  // Do backtracking if dead-end happens
  backtracking: (setting, board, x, y, outerLaps, backtrackY) => {
    for (let i = 0; i < setting.xSize; i++) board.set(x, i, 0);
    y = -1;
    outerLaps++;
    if (backtrackY) {
      for (let j = x; j > x - 2; j--) {
        for (let i = 0; i < setting.xSize; i++) board.set(j, i, 0);
      }
      x -= 2;
    }
  },

  // Generate random number based on the board size
  getRandomInt: (max) => {
    return Math.floor(Math.random() * Math.floor(max)) + 1;
  },

  // Checking the board
  checkBoard: (x, y, temp, setting, board) => {
    // Horizontal checking...
    for (let i = 0; i < y; i++) {
      if (board.get(x, i) === temp) return false;
    }
    // Vertical checking...
    for (let j = 0; j < x; j++) {
      if (board.get(j, y) === temp) return false;
    }
    // Area checking...
    for (let k = 0; k < setting.xSize; k++) {
      for (let l = 0; l < setting.ySize; l++) {
        if ((Math.floor(k / setting.sectionY) === Math.floor(x / setting.sectionY)) && (Math.floor(l / setting.sectionX) === Math.floor(y / setting.sectionX))) {
          if (board.get(k, l) === temp) return false;
        }
      }
    }
    return true;
  }

};

module.exports = mapping;
