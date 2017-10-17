class Video {

  constructor(tags) {
    const videoEl = $(tags.video).get(0);
    const progressEl = $(tags.progress).get(0);

    // #Video:TIMEUPDATE
    $(tags.video).bind(
      'timeupdate',
      () => {
        if (!videoEl.duration) { return; } // in case the video source changes

        progressEl.value = videoEl.currentTime / videoEl.duration;
      }
    );
  }
}

module.exports = Video;
