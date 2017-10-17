class Progress {

  constructor(tags) {

    const videoEl = $(tags.video).get(0);
    const progressEl = $(tags.progress).get(0);
    let wasPaused = false;

    // #Progress:MOUSEDOWN
    $(tags.progress).mousedown((e) => {
      if (videoEl.paused) { wasPaused = true; }
      videoEl.pause();

      let desiredProgress = e.offsetX / progressEl.offsetWidth;
      videoEl.currentTime = desiredProgress * videoEl.duration;
    });

    // #Progress:MOUSEUP
    $(tags.progress).mouseup(() => {
      if (!wasPaused) { videoEl.play(); }
      wasPaused = false;
    });
  }
}

module.exports = Progress;

//meaningless addition
