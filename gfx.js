const ctx = require('axel');
ctx.clear();

const backGround = () => {
  // kék keret
  ctx.bg(0, 153, 153);
  ctx.box(2, 2, 83, 36);

  // fekete hatter
  ctx.bg(0, 0, 0);
  ctx.box(3, 3, 60, 32);
  ctx.box(64, 3, 20, 21);
  ctx.box(64, 25, 20, 10);// kék keret
  ctx.bg(0, 153, 153);
  ctx.box(2, 2, 83, 36);
};

const commandLine = () => {
  ctx.text(67, 4, 'command list:');
  ctx.text(67, 6, '⇧  Up');
  ctx.text(67, 8, '⇩  Down');
  ctx.text(67, 10, '⇦  Left');
  ctx.text(67, 12, '⇨  Right');
  ctx.text(67, 14, 'C - Clear');
  ctx.text(67, 16, 'H - Help');
  ctx.text(67, 18, 'R - Restart');
  ctx.text(67, 20, 'N - New table');
  ctx.text(67, 22, 'Q - Quit');
};

const infoWindow = () => {
  ctx.fg(255, 204, 0);
  ctx.text(67, 26, 'Level: ');
  ctx.text(67, 28, 'Time: ');
  ctx.text(67, 30, 'Record: ');
  ctx.text(67, 32, 'Remaining: ');
};

const sudokuMolino = () => {
  ctx.bg(0, 153, 153);
  ctx.box(12, 3, 41, 7);

  ctx.fg(254, 204, 0);
  ctx.bg(254, 204, 0);
  ctx.text(2 + 14, 5 - 1, 'SSSS');
  ctx.text(1 + 14, 6 - 1, 'S');
  ctx.text(2 + 14, 7 - 1, 'SSS');
  ctx.text(5 + 14, 8 - 1, 'S');
  ctx.text(1 + 14, 9 - 1, 'SSSS');

  ctx.text(7 + 14, 5 - 1, 'U'); ctx.text(11 + 14, 5 - 1, 'U');
  ctx.text(7 + 14, 6 - 1, 'U'); ctx.text(11 + 14, 6 - 1, 'U');
  ctx.text(7 + 14, 7 - 1, 'U'); ctx.text(11 + 14, 7 - 1, 'U');
  ctx.text(7 + 14, 8 - 1, 'U'); ctx.text(11 + 14, 8 - 1, 'U');
  ctx.text(8 + 14, 9 - 1, 'UUU');

  ctx.text(13 + 14, 5 - 1, 'DDD');
  ctx.text(13 + 14, 6 - 1, 'D'); ctx.text(16 + 14, 6 - 1, 'D');
  ctx.text(13 + 14, 7 - 1, 'D'); ctx.text(17 + 14, 7 - 1, 'D');
  ctx.text(13 + 14, 8 - 1, 'D'); ctx.text(16 + 14, 8 - 1, 'D');
  ctx.text(13 + 14, 9 - 1, 'DDD');

  ctx.text(20 + 14, 5 - 1, 'OOO');
  ctx.text(19 + 14, 6 - 1, 'O'); ctx.text(23 + 14, 6 - 1, 'O');
  ctx.text(19 + 14, 7 - 1, 'O'); ctx.text(23 + 14, 7 - 1, 'O');
  ctx.text(19 + 14, 8 - 1, 'O'); ctx.text(23 + 14, 8 - 1, 'O');
  ctx.text(20 + 14, 9 - 1, 'OOO');

  ctx.text(25 + 14, 5 - 1, 'K'); ctx.text(29 + 14, 5 - 1, 'K');
  ctx.text(25 + 14, 6 - 1, 'K'); ctx.text(28 + 14, 6 - 1, 'K');
  ctx.text(25 + 14, 7 - 1, 'KK'); ctx.text(27 + 14, 7 - 1, 'K');
  ctx.text(25 + 14, 8 - 1, 'K'); ctx.text(28 + 14, 8 - 1, 'K');
  ctx.text(25 + 14, 9 - 1, 'K'); ctx.text(29 + 14, 9 - 1, 'K');

  ctx.text(31 + 14, 5 - 1, 'U'); ctx.text(35 + 14, 5 - 1, 'U');
  ctx.text(31 + 14, 6 - 1, 'U'); ctx.text(35 + 14, 6 - 1, 'U');
  ctx.text(31 + 14, 7 - 1, 'U'); ctx.text(35 + 14, 7 - 1, 'U');
  ctx.text(31 + 14, 8 - 1, 'U'); ctx.text(35 + 14, 8 - 1, 'U');
  ctx.text(32 + 14, 9 - 1, 'UUU');
};

const level = () => {
  ctx.bg(255, 153, 0);
  ctx.fg(0, 0, 0);
  ctx.box(23, 17, 19, 11);

  ctx.text(26, 18, 'Choose level:');
  ctx.text(31, 20, 'EASY');
  ctx.text(30, 22, 'MEDIUM');
  ctx.text(31, 24, 'HARD');
  ctx.text(25, 26, 'and press Enter');
};
ctx.cursor.restore();