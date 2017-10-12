// Factories whose return functions will be passed to various event listeners
const theaterizeVideoFactory = require('./factories/theaterizeVideo.js');
const playPauseFactory = require('./factories/playPause.js');


class Player {

  constructor(videoTag) {

    this.videoTag = videoTag;
    this.jel = $(videoTag);


    // WINDOW:RESIZE

    // make video scale with window
    const jWin = $(window);
    jWin.resize(theaterizeVideoFactory(videoTag));

    // #PLAYER:CLICK

    // make player play/pause on click
    this.jel.click(playPauseFactory(videoTag));
  }
}

module.exports = Player;
