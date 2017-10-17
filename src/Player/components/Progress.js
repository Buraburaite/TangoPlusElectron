const askForSourceFactory = require('../factories/askForSource.js');
const fullscreenFactory = require('../factories/fullscreen.js');

class Progress {

  constructor(tags) {

    const videoEl = $(tags.videoTag).get(0);
    const progressEl = $(tags.progressTag).get(0);
    let wasPaused = false;

    // #Progress:MOUSEDOWN
    $(tags.progressTag).mousedown((e) => {
      if (videoEl.paused) { wasPaused = true; }
      videoEl.pause();

      let desiredProgress = e.offsetX / progressEl.offsetWidth;
      videoEl.currentTime = desiredProgress * videoEl.duration;
    });

    // #Progress:MOUSEUP
    $(tags.progressTag).mouseup(() => {
      if (!wasPaused) { videoEl.play(); }
      wasPaused = false;
    });
  }
}

module.exports = Progress;
