class Video {

  constructor(tags) {
    const videoEl = $(tags.videoTag).get(0);
    const progressEl = $(tags.progressTag).get(0);

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
