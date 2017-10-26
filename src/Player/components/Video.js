const secToTime = require('../functions/secToTime.js'); // 1398 => 23:18

class Video {

  constructor(tags) {
    const videoEl = $(tags.video).get(0);
    const progressEl = $(tags.progress).get(0);
    const jTime = $(tags.cTime);
    const jDuration = $(tags.duration);

    // #Video:TIMEUPDATE
    $(tags.video).bind(
      'timeupdate',
      () => {
        if (!videoEl.duration) { return; } // in case the video source changes

        // update progress bar
        progressEl.value = videoEl.currentTime / videoEl.duration;

        // update time display
        jTime.text(secToTime(videoEl.currentTime));

        console.log(videoEl.currentTime);
      }
    );

    // #Video:LOADEDDATA
    $(tags.video).bind(
      'loadeddata',
      () => jDuration.text(secToTime(videoEl.duration))
    );
  }
}

module.exports = Video;
