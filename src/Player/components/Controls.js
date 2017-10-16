const askForSourceFactory = require('../factories/askForSource.js');
const fullscreenFactory = require('../factories/fullscreen.js');

class Controls {

  constructor(tags) {

    const videoEl = $(tags.videoTag).get(0);
    const progressEl = $(tags.progressTag).get(0);
    let wasPaused = false;

    // #progress-bar:MOUSEDOWN
    $(tags.progressTag).mousedown((e) => {
      if (videoEl.paused) { wasPaused = true; }
      videoEl.pause();

      let desiredProgress = e.offsetX / progressEl.offsetWidth;
      videoEl.currentTime = desiredProgress * videoEl.duration;
    });

    // #progress-bar:MOUSEUP
    $(tags.progressTag).mouseup((e) => {
      if (!wasPaused) { videoEl.play(); }
      wasPaused = false;
    });

    // various buttons:CLICK
    $(tags.loadTag).click(      askForSourceFactory(tags.videoTag));
    $(tags.fullscreenTag).click(fullscreenFactory(tags.videoTag));
  }
}

module.exports = Controls;
