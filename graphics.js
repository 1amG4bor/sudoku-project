const ctx = require('axel');

const gfx = {
  drawInterface: () => {
    // blue border
    ctx.bg(0, 153, 153);
    ctx.box(3, 2, 80, 30);
    // main grid
    ctx.bg(0, 0, 0);
    ctx.box(5, 3, 54, 28);
    ctx.box(61, 3, 20, 17);
    ctx.box(61, 21, 20, 10);
  },

  drawMenu: (level, time, remainedCell, rec) => {
    // game menu
    ctx.fg(255, 204, 0);
    ctx.text(62, 22, 'Level: ');
    ctx.text(62, 24, 'Time: ');
    ctx.text(62, 26, 'Remaining: ');
    ctx.text(62, 28, '~~~~~~~~~~~~~~~~~~');
    ctx.text(62, 29, 'Record: ');
    // input div
    ctx.bg(255, 204, 0);
    ctx.text(73, 22, '      ');
    ctx.text(73, 24, '      ');
    ctx.text(73, 26, '      ');
    ctx.text(73, 29, '      ');
    // test data
    ctx.fg(0, 0, 0);
    ctx.text(74, 22, level);
    ctx.text(74, 24, time);
    ctx.text(74, 26, remainedCell);
    ctx.text(74, 29, rec);
  },

  drawLogo: (x, y) => {
    // x = 12; y = 5;
    // sudoku sign
    ctx.bg(0, 153, 153);
    ctx.box(x, y, 41, 7);
    ctx.fg(255, 0, 0);
    ctx.bg(254, 204, 0);
    ctx.text(19, 8, '   S   U   D   O   K   U   ');
  },

  drawInfoBar: () => {
    // COMMAND LINE
    ctx.bg(0, 0, 0);
    ctx.fg(255, 204, 0);
    ctx.text(62, 3, 'Command list:');
    ctx.text(62, 4, '~~~~~~~~~~~~~');
    ctx.text(62, 5, '⇧  Up');
    ctx.text(62, 6, '⇩  Down');
    ctx.text(62, 7, '⇦  Left');
    ctx.text(62, 8, '⇨  Right');
    ctx.text(62, 9, '_  Enter');
    ctx.text(62, 10, '__________________');
    ctx.text(62, 12, ' C  -  Clear cell');
    ctx.text(62, 14, ' H  -  Help');
    ctx.text(62, 16, ' R  -  Restart');
    ctx.text(62, 18, 'ESC -  Menu / Exit');
  },

  drawChoosePanel: () => {
    // panel for choosing menu
    ctx.bg(255, 153, 0);
    ctx.fg(0, 0, 0);
    ctx.box(23, 17, 21, 11);
  },

  printGametype: (select) => {
    ctx.text(25, 18, 'Choose boardsize:');
    if (select === 1) {
      highlight('on');
      //console.log('2x2 selected');
    }
    ctx.text(28, 20, ' 2 x 2 [4] ');
    highlight('off');
    if (select === 2) {
      highlight('on');
      //console.log('3x2 selected');
    }
    ctx.text(28, 22, ' 3 x 2 [6] ');
    highlight('off');
    if (select === 3) {
      highlight('on');
      //console.log('3x3 selected');
    }
    ctx.text(28, 24, ' 3 x 3 [9] ');
    highlight('off');
    ctx.text(26, 26, 'and press Enter');
  },

  printLevel: () => {
    ctx.bg(255, 153, 0);
    ctx.fg(0, 0, 0);
    ctx.box(23, 17, 19, 11);

    ctx.text(26, 18, 'Choose level:');
    ctx.text(31, 20, 'EASY');
    ctx.text(30, 22, 'MEDIUM');
    ctx.text(31, 24, 'HARD');
    ctx.text(25, 26, 'and press Enter');
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
