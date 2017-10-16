// Scripts for our subcomponents
const Controls = require('./Controls/Controls.js');
const Video = require('./Video/Video.js');

// Factories whose return functions will be passed to various event listeners
const playPauseFactory = require('./Video/factories/playPause.js');

class Player {

  constructor(tagTree) {
    this.tag = tagTree.compTag;

    this.controls = new Controls(tagTree.controls);
    this.video = new Video(tagTree.video);

    // #VIDEO-CONTAINER:CLICK

    // play/pause on click
    $('#video-container').click(playPauseFactory(tagTree.videoTag));
  }
}

module.exports = Player;
