// Factories whose return functions will be passed to various event listeners
const theaterizeFactory = require('./factories/theaterize.js');

class Video {

  constructor(tags) {
    this.tag = tags.videoTag;
    this.jel = $(this.tag);

    // WINDOW:RESIZE

    // make video scale with window
    const jWin = $(window);
    jWin.resize(theaterizeFactory(this.tag));
  }
}

module.exports = Video;
