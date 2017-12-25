class Progress {

  constructor(tags, services) {

    // Save our connection to the application state
    this.doubsService = services.doubtitles;

    const videoEl = $(tags.video).get(0);
    const progressEl = $(tags.progress).get(0);
    let wasPaused = false;
    let tooltip = $('.tooltip-progress');
    let hoverPos = 0;

    $(document).ready(() => {

      $('.tooltip-progress').tooltipster({
        trigger: 'custom',
        triggerOpen:  { mouseenter: true },
        triggerClose: { mouseleave: true },
        functionPosition: (instance, helper, position) => {
          let tipbox = $(helper.tooltip);
          position.coord.left = hoverPos - (tipbox.width() / 2) + 16;
          return position;
        },
        updateAnimation: null
      });
    });

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

    // #Progress:MOUSEMOVE
    $(tags.progress).mousemove((e) => {
      hoverPos = e.offsetX;
      let desiredTime = e.offsetX / progressEl.offsetWidth * videoEl.duration;
      tooltip.tooltipster('content', this.doubs.getSlide(desiredTime).text);

      // tooltip.tooltipster('reposition');
    });
  }

  // getter used here to allow updates to flow from the service
  get doubs() { return this.doubsService.doubs; }
}

module.exports = Progress;
