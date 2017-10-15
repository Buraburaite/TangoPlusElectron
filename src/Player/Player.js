// Scripts for our subcomponents
const Controls = require('./Controls/Controls.js');
const Video = require('./Video/Video.js');

// Factories whose return functions will be passed to various event listeners

class Player {

  constructor(tagTree) {
    this.tag = tagTree.compTag;

    this.controls = new Controls(tagTree.controls);
    this.video = new Video(tagTree.video);
  }
}

module.exports = Player;
