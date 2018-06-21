const ctx = require('axel');

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

  drawMenu: (levelNum, timer, remainedCell, record) => {
    let level = 'N/A';
    let time = calculateTime(timer);
    if (levelNum === 1) level = 'easy';
    else if (levelNum === 2) level = 'medium';
    else if (levelNum === 3) level = 'hard';
    // game menu
    ctx.fg(255, 204, 0);
    ctx.text(60, 16, 'Level: ');
    ctx.text(60, 18, 'Time: ');
    ctx.text(60, 20, 'Remained: ');
    ctx.text(60, 22, 'Record: ');
    // input div
    ctx.fg(0, 0, 0);
    ctx.bg(255, 204, 0);
    ctx.text(70, 16, '        ');
    ctx.text(70, 18, '        ');
    ctx.text(70, 20, '        ');
    ctx.text(70, 22, '        ');
    // test data
    ctx.fg(0, 0, 0);
    ctx.text(71, 16, level);
    ctx.text(71, 18, time);
    ctx.text(71, 20, remainedCell);
    ctx.text(71, 22, record);
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
    
    ctx.bg(0, 153, 153);
    ctx.box(12, 2, 40, 2);
    ctx.fg(255, 204, 0);
    ctx.bg(153, 0, 0);
    ctx.text(18, 2, '   S   U   D   O   K   U   ');
    
    // >>> MainBoard <<<
    // Grid
    switch (gameBoard.length) {
      case 4:
        for (let i = 0; i < 2; i++) {
          for (let j = 0; j < 2; j++) {
            let x = 11 + (21 * j);
            let y = 4 + (11 * i);
            if ((i + j) % 2 === 0) { // változó hatterszin
              ctx.bg(51, 51, 51);
              ctx.box(x, y, 16, 8);
            } else ctx.bg(102, 102, 102);
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
              ctx.bg(102, 102, 102);
              ctx.box(x, y, 13, 6);
            } else ctx.bg(51, 51, 51);
            ctx.box(x, y, 13, 6);
          }
        }
        ctx.bg(0, 153, 153);
        ctx.line(1, 1, 57, 1);
        ctx.line(1, 24, 57, 24);
        ctx.bg(0, 0, 0);
        ctx.line(2, 3, 55, 3);
        ctx.line(2, 8, 55, 8);
        ctx.line(2, 13, 55, 13);
        ctx.line(2, 18, 55, 18);
        ctx.line(2, 23, 55, 23);

        ctx.box(15, 2, 2, 22);
        ctx.box(28, 2, 2, 22);
        ctx.box(41, 2, 2, 22);
        break;
    }
    // Cells

    for (let j = 0; j < gameBoard.length; j++) {
      for (let i = 0; i < gameBoard.length; i++) {
        let m = gfx.calcPosition(i, j, gameBoard.length)[0];
        let n = gfx.calcPosition(i, j, gameBoard.length)[1];
        let sectionX = Math.floor(i / Math.sqrt(gameBoard.length));
        let sectiony = Math.floor(j / Math.sqrt(gameBoard.length));
        if ((sectionX + sectiony) % 2 === 0) ctx.bg(102, 102, 102);
        else (ctx.bg(51, 51, 51));
        ctx.fg(0, 0, 0);
        switch (gameBoard.length) {
          case 4:
            ctx.box(m - 1, n, 3, 1);
            if (gameBoard[i][j].toString() !== '') ctx.text(m, n, gameBoard[i][j].toString());
            break;
          case 9: // ok
            ctx.box(m - 1, n, 3, 1);
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
    let x = gfx.calcPosition(cursorState[0], cursorState[1], gameBoard.length)[0];
    let y = gfx.calcPosition(cursorState[0], cursorState[1], gameBoard.length)[1];
    ctx.bg(204, 153, 0);
    ctx.fg(255, 0, 0);
    let value = gameBoard[cursorState[0]][cursorState[1]].toString();
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
  },

  calcPosition: (x, y, tableLength) => {
    let m = 0;
    let n = 0;
    let gfxPos = [];
    switch (tableLength) {
      case 4:
        m = 15 + (7 * x) + ((Math.floor(x / 2) * 7));
        n = 6 + (3 * y) + ((Math.floor(y / 2) * 5));
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
};

module.exports = gfx;

function highlight (state) {
  if (state === 'on') {
    ctx.bg(153, 0, 0);
    ctx.fg(255, 153, 0);
  } else {
    ctx.bg(255, 153, 0);
    ctx.fg(0, 0, 0);
  }
}

function calculateTime (second) {
  let time;
  let min, sec;
  min = Math.floor(second / 60);
  sec = second - (min * 60);
  if (sec < 10) time = min + ':0' + sec;
  else time = min + ':' + sec;
  return time;
}
/*
calcPosition: (x, y, tableLength) => {
  let m = 0;
  let n = 0;
  let gfxPos = [];
  switch (tableLength) {
    case 4:
      m = 18 + (7 * x) + ((Math.floor(x / 2) * 6));
      n = 10 + (3 * y) + ((Math.floor(y / 2) * 4));
      break;
    case 9: // ok
      m = 12 + (4 * x) + ((Math.floor(x / 3) * 3));
      n = 7 + (2 * y) + ((Math.floor(y / 3) * 2));
      break;
    case 16:
      m = 6 + (3 * x) + ((Math.floor(x / 4) * 2));
      n = 5 + (y) + ((Math.floor(y / 4) * 3));
      break;
  }
  gfxPos.push(m, n);
  return gfxPos;
}
*/
