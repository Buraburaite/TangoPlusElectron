const leftpad = require('left-pad');

// 1398     => 00:23:18,000
// 2.060692 => 00:00:02,061
module.exports = (sec) => {
  let hour = Math.floor(sec / 3600);
  let min  = Math.floor(sec / 60);
  let ms   = Math.floor(sec * 1000);
  sec      = Math.floor(sec % 60); // floor seconds last to maintain precision

  ms = ms.toString().slice(-3); // we want only the last three digits

  hour = leftpad(hour, 2, '0');
  min  = leftpad(min,  2, '0');
  sec  = leftpad(sec,  2, '0');
  ms   = leftpad(ms,   3, '0');

  return `${hour}:${min}:${sec},${ms}`;
};
