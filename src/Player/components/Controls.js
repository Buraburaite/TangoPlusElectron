const askForSourceFactory = require('../factories/askForSource.js');
const fullscreenFactory = require('../factories/fullscreen.js');
const playPauseFactory = require('../factories/playPause.js');

class Controls {

  constructor(tags) {

    this.isAutoReplayEnabled = false;

    // various buttons:CLICK
    $(tags.playPauseTag).click( playPauseFactory(tags));
    $(tags.loadTag).click(      askForSourceFactory(tags));
    $(tags.fullscreenTag).click(fullscreenFactory(tags));

    // ensure playPauseBtn icon always matches the video state
    const jPlayPauseIcon = $(tags.playPauseTag + ' i');
    $(tags.videoTag).on(
      'play pause', // #Video:PLAY & #Video:PAUSE
      () => jPlayPauseIcon.toggleClass('fa-play fa-pause')
    );

    $(tags.videoTag).on(
      'ended',
      () => {
        if (this.isAutoReplayEnabled) { $(tags.videoTag).get(0).play(); }
      }
    );

  }
}

module.exports = Controls;
