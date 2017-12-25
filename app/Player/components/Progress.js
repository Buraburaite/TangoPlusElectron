class Progress {

  constructor(tags, services) {

    // Save our connection to the application state
    this.doubsService = services.doubtitles;

    const videoEl = $(tags.video).get(0);
    const progressEl = $(tags.progress).get(0);
    const tooltip = $('.tooltip-progress');
    let wasPaused = false;
    let mouseX = 0;


    // #Progress:MOUSEDOWN
    $(tags.progress).mousedown((e) => {
      if (videoEl.paused) { wasPaused = true; }
      videoEl.pause();

      let desiredProgress = mouseX / progressEl.offsetWidth;
      videoEl.currentTime = desiredProgress * videoEl.duration;
    });

    // #Progress:MOUSEUP
    $(tags.progress).mouseup(() => {
      if (!wasPaused) { videoEl.play(); }
      wasPaused = false;
    });

    // #Progress:MOUSEMOVE
    $(tags.progress).mousemove((e) => {
      // update our record of the mouse position
      mouseX = e.offsetX;

      // update the content of the tooltip
      let desiredTime = mouseX / progressEl.offsetWidth * videoEl.duration;
      tooltip.tooltipster('content', this.doubs.getSlide(desiredTime).text);
    });

    // setup progress tooltip
    $(document).ready(() => {

      tooltip.tooltipster({
        trigger: 'custom',
        triggerOpen:  { mouseenter: true },
        triggerClose: { mouseleave: true },
        functionPosition: (instance, helper, position) => {
          // get the x-position of the mouse, relative to the viewport...
          let pageX = progressEl.offsetLeft + mouseX;

          // ...align the tooltip arrow with the mouse...
          position.target = pageX;

          // ...center the tooltip on the arrow.
          position.coord.left = position.target - ($(helper.tooltip).width() / 2);
          return position;
        },
        updateAnimation: null
      });
    });
  }

  // getter used here to allow updates to flow from the service
  get doubs() { return this.doubsService.doubs; }
}

module.exports = Progress;
