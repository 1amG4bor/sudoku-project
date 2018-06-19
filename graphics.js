const ctx = require('axel');
let term = require('terminal-kit').terminal;

/*const cellPositions = [
  [12, ], [16, 7], [20, 7], [27, 7], [31, 7], [35, 7], [42, 7], [46, 7], [50, 7],
  [12, 9], [16, 9], [20, 9], [27, 9], [31, 9], [35, 9], [42, 9], [46, 9], [50, 9],
  [12, 11], [16, 11], [20, 11], [27, 11], [31, 11], [35, 11], [42, 11], [46, 11], [50, 11],
  [12, 15], [16, 15], [20, 15], [27, 15], [31, 15], [35, 15], [42, 15], [46, 15], [50, 15],
  [12, 17], [16, 17], [20, 17], [27, 17], [31, 17], [35, 17], [42, 17], [46, 17], [50, 17],
  [12, 19], [16, 19], [20, 19], [27, 19], [31, 19], [35, 19], [42, 19], [46, 19], [50, 19],
  [12, 23], [16, 23], [20, 23], [27, 23], [31, 23], [35, 23], [42, 23], [46, 23], [50, 23],
  [12, 25], [16, 25], [20, 25], [27, 25], [31, 25], [35, 25], [42, 25], [46, 25], [50, 25],
  [12, 27], [16, 27], [20, 27], [27, 27], [31, 27], [35, 27], [42, 27], [46, 27], [50, 27]];
*/

const gfx = {
  drawInterface: () => {
    // blue border
    ctx.bg(0, 153, 153, 0);
    ctx.box(1, 1, 80, 24);
    // main grid
    ctx.bg(0, 0, 0);
    ctx.box(2, 2, 55, 22);
    ctx.box(58, 2, 22, 12);
    ctx.box(58, 15, 22, 9);
  },

  drawMenu: (level, time, remainedCell, record) => {
    // game menu
    ctx.fg(255, 204, 0);
    ctx.text(60, 16, 'Level: ');
    ctx.text(60, 18, 'Time: ');
    ctx.text(60, 20, 'Remained: ');
    ctx.text(60, 22, 'Record: ');
    // input div
    ctx.bg(255, 204, 0);
    ctx.text(70, 16, '        ');
    ctx.text(70, 18, '        ');
    ctx.text(70, 20, '        ');
    ctx.text(70, 22, '        ');
    // test data
    ctx.fg(0, 0, 0);
    ctx.text(75, 22, level);
    ctx.text(75, 24, time);
    ctx.text(75, 26, remainedCell);
    ctx.text(75, 29, record);
  },

  drawLogo: (x, y) => {
    // x = 8; y = 5;
    // sudoku sign
    ctx.bg(0, 153, 153);
    ctx.box(x, y, 41, 4);
    ctx.fg(0, 153, 153);
    ctx.bg(0, 0, 0);
    ctx.text(4, 4, '███████╗██╗   ██╗██████╗  ██████╗ ██╗  ██╗██╗   ██╗');
    ctx.text(4, 5, '██╔════╝██║   ██║██╔══██╗██╔═══██╗██║ ██╔╝██║   ██║');
    ctx.text(4, 6, '███████╗██║   ██║██║  ██║██║   ██║█████╔╝ ██║   ██║');
    ctx.text(4, 7, '╚════██║██║   ██║██║  ██║██║   ██║██╔═██╗ ██║   ██║');
    ctx.text(4, 8, '███████║╚██████╔╝██████╔╝╚██████╔╝██║  ██╗╚██████╔╝');
    ctx.text(4, 9, '╚══════╝ ╚═════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ');



  },

  drawInfoBar: () => {
    // COMMAND LINE
    ctx.bg(0, 0, 0);
    ctx.fg(255, 204, 0);
    ctx.text(63, 2, 'Command list:');
    ctx.text(62, 4, '⇧    Up');
    ctx.text(62, 5, '⇩    Down');
    ctx.text(62, 6, '⇦    Left');
    ctx.text(62, 7, '⇨    Right');
    ctx.text(62, 8, '_    Enter');
    ctx.text(60, 9, '  C -  Clear cell');
    ctx.text(60, 10, '  H -  Help');
    ctx.text(60, 11, '  R -  Restart');
    ctx.text(60, 12, 'ESC -  Menu / Exit');
  },

  drawChoosePanel: () => {
    // panel for choosing menu
    ctx.bg(255, 153, 0);
    ctx.fg(0, 0, 0);
    ctx.box(18, 12, 21, 11);
  },

  printGametype: (select) => {
    ctx.text(20, 13, 'Choose boardsize:');
    if (select === 1) {
      highlight('on');
    }
    ctx.text(23, 15, ' 2 x 2 [4] ');
    highlight('off');
    if (select === 2) {
      highlight('on');
    }
    ctx.text(23, 17, ' 3 x 3 [9] ');
    highlight('off');
    if (select === 3) {
      highlight('on');
    }
    ctx.text(23, 19, ' 4 x 4 [16] ');
    highlight('off');
    ctx.text(21, 21, 'and press Enter');
  },

  printLevel: (select) => {
    ctx.text(21, 13, 'Choose level:');
    if (select === 1) {
      highlight('on');
    }
    ctx.text(26, 15, 'EASY');
    highlight('off');
    if (select === 2) {
      highlight('on');
    }
    ctx.text(25, 17, 'MEDIUM');
    highlight('off');
    if (select === 3) {
      highlight('on');
    }
    ctx.text(26, 19, 'HARD');
    highlight('off');
    ctx.text(20, 21, 'and press Enter');
  },

  drawGameBoard: (gameBoard, fixed) => {
    // Mini logo
    /*ctx.bg(0, 153, 153);
    ctx.box(12, 2, 40, 2);
    ctx.fg(255, 204, 0);
    ctx.bg(153, 0, 0);
    ctx.text(18, 2, '   S   U   D   O   K   U   '); */
    // >>> MainBoard <<<
    // Grid
    switch (gameBoard.length) {
      case 4:
        for (let i = 0; i < 2; i++) {
          for (let j = 0; j < 2; j++) {
            let x = 14 + (20 * j);
            let y = 8 + (10 * i);
            ctx.bg(51, 51, 51);
            ctx.box(x, y, 16, 8);
          }
        }
        break;
      case 9:
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            let x = 10 + (13 * j);
            let y = 3 + (7 * i);
            if ((i + j) % 2 === 0) { // változó hatterszin
              ctx.bg(51, 51, 51);
              ctx.box(x, y, 13, 7);
            } else ctx.bg(102, 102, 102);
            ctx.box(x, y, 13, 7);
          }
        }
        break;
      case 16:
        for (let i = 0; i < 4; i++) {
          for (let j = 0; j < 4; j++) {
            let x = 3 + (13 * j);
            let y = 3 + (5 * i);
            if ((i + j) % 2 === 0) { // változó hatterszin
              ctx.bg(51, 51, 51);
              ctx.box(x, y, 13, 6);
            } else ctx.bg(102, 102, 102);
            ctx.box(x, y, 13, 6);
          }
        }
        break;
    }
    // Cells

    for (let j = 0; j < gameBoard.length; j++) {
      for (let i = 0; i < gameBoard.length; i++) {
        let m = calcPosition(i, j, gameBoard.length)[0];
        let n = calcPosition(i, j, gameBoard.length)[1];
        if (m === 1) { // változó kurzorhatter
          ctx.bg(255, 255, 255);
        } else (ctx.bg(153, 102, 102));
        switch (gameBoard.length) {
          case 4:
            ctx.box(m - 1, n, 3, 1);
            if (gameBoard[i][j].toString() !== '') ctx.text(m, n, gameBoard[i][j].toString());
            break;
          case 9: // ok
            ctx.box(m, n, 1, 1);
            if (gameBoard[i][j].toString() !== '') ctx.text(m, n, gameBoard[i][j].toString());
            break;
          case 16:
            ctx.box(m, n, 2, 1);
            if (gameBoard[i][j].toString() !== '') {
              if (parseInt(gameBoard[i][j]) < 10) ctx.text(m + 1, n, gameBoard[i][j].toString());
              else ctx.text(m, n, gameBoard[i][j].toString());
            }
            break;
        }
      }
    }
    // fix cells
  },

  drawCursor: (menuIndex, cursorState, gameBoard) => {
    let x = calcPosition(cursorState[0], cursorState[1], gameBoard.length)[0];
    let y = calcPosition(cursorState[0], cursorState[1], gameBoard.length)[1];
    ctx.bg(204, 153, 0);
    ctx.fg(255, 0, 0);
    let value = gameBoard[cursorState[0]][cursorState[1]].toString();
    console.log('gfxPos= ' + x + ',' + y);
    console.log('value= ' + value);
    switch (menuIndex[0]) {
      case 1:
        ctx.box(x - 2, y, 5, 1);
        ctx.text(x, y, value);
        break;
      case 2:
        ctx.box(x - 1, y, 3, 1);
        ctx.text(x, y, value);
        break;
      case 3:
        ctx.box(x, y, 2, 1);
        if (value.length > 1) ctx.text(x, y, value);
        else ctx.text(x + 1, y, value);
        break;
    }
    ctx.cursor.restore();
  }

};

module.exports = gfx;

function highlight(state) {
  if (state === 'on') {
    ctx.bg(153, 0, 0);
    ctx.fg(255, 153, 0);
  } else {
    ctx.bg(255, 153, 0);
    ctx.fg(0, 0, 0);
  }
}

function calcPosition(x, y, tableLength) {
  let m = 0;
  let n = 0;
  let gfxPos = [];
  switch (tableLength) {
    case 4:
      m = 18 + (7 * x) + ((Math.floor(x / 2) * 6));
      n = 10 + (3 * y) + ((Math.floor(y / 2) * 4));
      break;
    case 9: // ok
      m = 12 + (4 * x) + ((Math.floor(x / 3) * 1));
      n = 4 + (2 * y) + ((Math.floor(y / 3) * 1));
      break;
    case 16:
      m = 4 + (3 * x) + ((Math.floor(x / 4) * 1));
      n = 4 + (y) + ((Math.floor(y / 4) * 1));
      break;
  }
  gfxPos.push(m, n);
  return gfxPos;
}
