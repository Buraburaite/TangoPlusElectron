// Factories whose return functions will be passed to various event listeners
const playPauseFactory = require('./factories/playPause.js');
const theaterizeFactory = require('./factories/theaterize.js');

class Video {

  constructor(tagTree) {
    this.tag = tagTree.compTag;

    // WINDOW:RESIZE

    // make video scale with window
    $(window).resize(theaterizeFactory(this.tag));

    // #VIDEO-CONTAINER:CLICK

    // play/pause on click
    $('#video-container').click(playPauseFactory(this.tag));
  }
}

module.exports = Video;
