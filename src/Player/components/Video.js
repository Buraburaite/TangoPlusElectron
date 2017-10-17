// Factories whose return functions will be passed to various event listeners
const syncProgressBarToVideoFactory = require('../factories/syncProgressBarToVideo.js');

class Video {

  constructor(tags) {
    const videoEl = $(videoTag).get(0);
    const progressEl = $(progressTag).get(0);

    // #Video:TIMEUPDATE
    $(tags.videoTag).bind(
      'timeupdate',
      () => {
        if (!videoEl.duration) { return; } // in case the video source changes

        progressEl.value = videoEl.currentTime / videoEl.duration;
      }
    );
  }
}

module.exports = Video;
