class Progress {

  constructor(tags) {

    const videoEl = $(tags.video).get(0);
    const progressEl = $(tags.progress).get(0);
    let wasPaused = false;
    let hoverPos = 0;

    $('.tooltip-progress').tooltipster({
      trigger: 'hover',
      functionPosition: (instance, helper, position) => {
        position.coord.left = hoverPos;//helper.origin.offsetWidth;
        return position;
      }
    });

    // #Progress:MOUSEDOWN
    $(tags.progress).mousedown((e) => {
      if (videoEl.paused) { wasPaused = true; }
      videoEl.pause();

      let desiredProgress = e.offsetX / progressEl.offsetWidth;
      videoEl.currentTime = desiredProgress * videoEl.duration;

      hoverPos = e.offsetX;

    });

    // #Progress:MOUSEUP
    $(tags.progress).mouseup(() => {
      if (!wasPaused) { videoEl.play(); }
      wasPaused = false;
    });

    // #Progress:MOUSEMOVE
    $(tags.progress).mousemove((e) => {
      hoverPos = e.offsetX;
      $('.tooltip-progress').tooltipster('reposition');
    });
  }
}

module.exports = Progress;
