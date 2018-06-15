// ###===---> Sudoku v0.0.1 <---===###

// npm Packages:
const readline = require('readline-sync');
const ctx = require('axel');
const GFX = require('./graphics');
const mapping = require('./mapping');
let Array2d = require('array-2d');
let { table } = require('table');

// declaration
let output;
let result = [];
// Make board
let setting = mapping.setBoard(81);
let board = new Array2d(setting.xSize, setting.ySize, 0);
board = mapping.generateBoard(setting);
// console.log(board.toString());
// Draw the board
for (let i = 0; i < setting.ySize; i++) {
  result[i] = [];
  for (let j = 0; j < setting.xSize; j++) result[i][j] = board.get(i, j);
}
output = table(result);

// ### start test!
let quit = false;
while (!quit) {
  console.log('\x1Bc');
  console.log(output);
}

// ### end test

/*
function reDraw (menu, index) {
  console.log('\x1Bc');
  ctx.clear();
  GFX.drawInterface();
  switch (menu) {
    case 'chooseGame':
      // console.log('Gamechoosing...: ' + iGame);
      GFX.drawLogo(12, 5);
      GFX.drawChoosePanel();
      GFX.printGametype(index); // options: 1->'2x2', 2->'3x3', 3->'4x4'
      break;
    case 'chooseLevel':
      // console.log('Levelchoosing...: ' + iLevel);
      GFX.drawLogo(12, 5);
      GFX.drawChoosePanel();
      GFX.printLevel(index); // options: 1-'easy', 2-'med', 3-'hard'
      break;
  }
  GFX.drawInfoBar();
  // GFX.drawMenu('med', '0:00', '45', '0:42');
  GFX.drawMenu('', '', '', '');
  // ctx.cursor.restore();
}
*/