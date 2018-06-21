let term = require('terminal-kit').terminal;
/*
term.moveTo(1, 5);
term.bgRed();
term.eraseDisplayBelow();
*/

/*
term.bgColorRgb(255, 0, 0);
term.eraseDisplayBelow();
*/

term.bgRed.clear();
term('Hello\n');
term.white.bgBlack('---\n');
term.red.bgYellow('this is a cell');
term.hideCursor();
