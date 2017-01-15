var {slides, slideMarks} = require("./parseSrt.js");

var isPlaying = false;
var nextSlideNum = -1;

module.exports = {
  "slides" : slides,
  "slideMarks" : slideMarks,
  "isPlaying" : isPlaying,
  "nextSlideNum" : nextSlideNum
};
