const askForSourceFactory = require('../Video/factories/askForSource.js');
const fullscreenFactory = require('../Video/factories/fullscreen.js');

class Controls {

  constructor(tagTree) {
    this.tag = tagTree.compTag;

    // various buttons:CLICK

    $('#load-btn').click(askForSourceFactory(tagTree.videoTag));
    $('#Player').click(fullscreenFactory(tagTree.videoTag));
  }
}

module.exports = Controls;
