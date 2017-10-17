const askForSourceFactory = require('../factories/askForSource.js');
const fullscreenFactory = require('../factories/fullscreen.js');

class Controls {

  constructor(tags) {

    // various buttons:CLICK
    $(tags.loadTag).click(      askForSourceFactory(tags));
    $(tags.fullscreenTag).click(fullscreenFactory(tags));
  }
}

module.exports = Controls;
