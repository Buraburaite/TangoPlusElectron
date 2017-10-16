// Scripts for our subcomponents
const Controls = require('./components/Controls.js');
const Video = require('./components/Video.js');

// Factories whose return functions will be passed to various event listeners
const theaterizeFactory = require('./factories/theaterize.js');
const playPauseFactory = require('./factories/playPause.js');

class Player {

  constructor(tags) {

    this.controls = new Controls(tags);
    this.video = new Video(tags);

    // WINDOW:RESIZE
    // make video scale with window
    $(window).resize(theaterizeFactory(tags.videoTag));

    // #VIDEO-CONTAINER:CLICK
    $('#video-container').click(playPauseFactory(tags.videoTag));
  }
}

module.exports = Player;
