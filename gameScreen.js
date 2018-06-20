const ctx = require('axel');
let Array2d = require('array-2d');
let positionMapBig = new Array2d(81, 2, 0);
let tableBig = [[12, 7], [16, 7], [20, 7], [27, 7], [31, 7], [35, 7], [42, 7], [46, 7], [50, 7],
  [12, 9], [16, 9], [20, 9], [27, 9], [31, 9], [35, 9], [42, 9], [46, 9], [50, 9], [12, 11], [16, 11],
  [20, 11], [27, 11], [31, 11], [35, 11], [42, 11], [46, 11], [50, 11], [12, 15], [16, 15], [20, 15],
  [27, 15], [31, 15], [35, 15], [42, 15], [46, 15], [50, 15], [12, 17], [16, 17], [20, 17], [27, 17],
  [31, 17], [35, 17], [42, 17], [46, 17], [50, 17], [12, 19], [16, 19], [20, 19], [27, 19], [31, 19],
  [35, 19], [42, 19], [46, 19], [50, 19], [12, 23], [16, 23], [20, 23], [27, 23], [31, 23], [35, 23],
  [42, 23], [46, 23], [50, 23], [12, 25], [16, 25], [20, 25], [27, 25], [31, 25], [35, 25], [42, 25],
  [46, 25], [50, 25], [12, 27], [16, 27], [20, 27], [27, 27], [31, 27], [35, 27], [42, 27], [46, 27],
  [50, 27]];

ctx.clear();

// blue border
ctx.bg(0, 153, 153);
ctx.box(3, 2, 80, 30);
// main grid
ctx.bg(0, 0, 0);
ctx.box(5, 3, 54, 28);
ctx.box(61, 3, 20, 17);
ctx.box(61, 21, 20, 10);
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
ctx.text(74, 22, 'easy');
ctx.text(74, 24, '0:21');
ctx.text(74, 26, '6');
ctx.text(74, 29, '0:42');

// COMMAND LINE
ctx.bg(0, 0, 0);
ctx.fg(255, 204, 0);
ctx.text(62, 3, 'Command list:');
ctx.text(62, 4, '~~~~~~~~~~~~~');
ctx.text(62, 5, '⇧  Up');
ctx.text(62, 6, '⇩  Down');
ctx.text(62, 7, '⇦  Left');
ctx.text(62, 8, '⇨  Right');
ctx.text(62, 9, '=  Enter');
ctx.text(62, 10, '__________________');
ctx.text(62, 12, ' C  -  Clear cell');
ctx.text(62, 14, ' H  -  Help');
ctx.text(62, 16, ' R  -  Restart');
ctx.text(62, 18, 'ESC -  Menu / Exit');

drawBigBoard();
ctx.cursor.restore();
// console.log(positionMapBig.toString());

// GAMEBOARDS
function drawBigBoard  () {
  let x = 10;
  let y = 6;
  for (let i = 1; i < 10; i++) {
    ctx.bg(51, 51, 51);
    ctx.box(x, y, 13, 7);
    x += 15;
    if (i % 3 === 0) {
      y += 8;
      x = 10;
    }
  }
  y = 5;
  let cell = 0;
  for (let j = 1; j < 10; j++) {
    x = 12;
    y += 2;
    for (let i = 1; i < 10; i++) {
      ctx.bg(102, 102, 102);
      ctx.box(x, y, 1, 1);
      positionMapBig.set(cell, 0, x);
      positionMapBig.set(cell, 1, y);
      cell++;
      x += 4;
      if (i % 3 === 0) x += 3;
    }
    if (j % 3 === 0) y += 2;
  }
  // sudoku sign
  ctx.bg(0, 153, 153);
  ctx.box(12, 2, 40, 3);
  ctx.fg(255, 204, 0);
  ctx.bg(0, 0, 0);
  ctx.text(18, 3, '   S   U   D   O   K   U   ');
}
