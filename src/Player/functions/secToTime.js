const leftpad = require('left-pad');

module.exports = (sec) => { // 1398 => 23:18
  let min = Math.floor(sec / 60);
  sec     = Math.floor(sec % 60);

  sec = leftpad(sec, 2, '0');

  return min + ':' + sec;
};
