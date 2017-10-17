// Scripts for our subcomponents
const Controls = require('./components/Controls.js');
const Progress = require('./components/Progress.js');
const Video = require('./components/Video.js');

// Factories whose return functions will be passed to various event listeners
const theaterizeFactory = require('./factories/theaterize.js');
const playPauseFactory = require('./factories/playPause.js');

class Player {

  constructor(tags) {

    this.controls = new Controls(tags);
    this.progress = new Progress(tags);
    this.video = new Video(tags);

    // window:RESIZE
    // make video scale with window
    $(window).resize(theaterizeFactory(tags));

    // #video-container:CLICK
    $('#video-container').click(playPauseFactory(tags));
  }
}

module.exports = Player;
