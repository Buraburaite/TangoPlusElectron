const askForSourceFactory = require('../factories/askForSource.js');
const fullscreenFactory = require('../factories/fullscreen.js');
const playPauseFactory = require('../factories/playPause.js');

class Controls {

  constructor(tags) {

    // various buttons:CLICK
    $(tags.playPauseTag).click( playPauseFactory(tags));
    $(tags.loadTag).click(      askForSourceFactory(tags));
    $(tags.fullscreenTag).click(fullscreenFactory(tags));
  }
}

module.exports = Controls;
