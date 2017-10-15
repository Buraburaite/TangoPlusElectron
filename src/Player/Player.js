// Factories whose return functions will be passed to various event listeners
const theaterizeVideoFactory = require('./factories/theaterizeVideo.js');

const playPauseFactory = require('./Video/factories/playPause.js');

const Controls = require('./Controls/Controls.js');


class Player {

  constructor(tags) {
    this.tag = tags.videoTag;
    this.jel = $(this.tag);

    this.controls = new Controls(tags);

    // WINDOW:RESIZE

    // make video scale with window
    const jWin = $(window);
    jWin.resize(theaterizeVideoFactory(this.tag));

    // #VIDEO-CONTAINER:CLICK

    // play/pause on click
    $('#video-container').click(playPauseFactory(this.tag));
  }
}

module.exports = Player;
