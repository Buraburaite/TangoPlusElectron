const leftpad = require('left-pad');

module.exports = (secs) => { // 1398 => 23:18
  let mins = Math.floor(secs / 60);
  secs     = Math.floor(secs % 60);

  secs = leftpad(secs, 2, '0');

  return mins + ':' + secs;
};
