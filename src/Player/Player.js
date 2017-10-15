// Scripts for our subcomponents
const Controls = require('./Controls/Controls.js');
const Video = require('./Video/Video.js');

// Factories whose return functions will be passed to various event listeners
const playPauseFactory = require('./Video/factories/playPause.js');



class Player {

  constructor(tags) {
    this.tag = tags.playerTag;
    this.jel = $(this.tag);

    this.controls = new Controls(tags);
    this.video = new Video(tags);

    // #VIDEO-CONTAINER:CLICK

    // play/pause on click
    $('#video-container').click(playPauseFactory(tags.videoTag));
  }
}

module.exports = Player;
