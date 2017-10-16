// Factories whose return functions will be passed to various event listeners
const theaterizeFactory = require('./factories/theaterize.js');

class Video {

  constructor(tagTree) {
    this.tag = tagTree.compTag;

    // WINDOW:RESIZE

    // make video scale with window
    $(window).resize(theaterizeFactory(this.tag));
  }
}

module.exports = Video;
