class Progress {

  constructor(tags, services) {

    // Save our connection to the application state
    this.doubsService = services.doubtitles;

    const videoEl = $(tags.video).get(0);
    const progressEl = $(tags.progress).get(0);
    const tooltip = $('.tooltip-progress');

    const secToTime = require('../functions/secToTime.js');

    let wasPaused = false;
    let mouseX = 0;


    // #Progress:MOUSEDOWN
    $(tags.progress).mousedown((e) => {

      // exit if video is not loaded yet
      if (videoEl.readyState < 4) { return; }

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
      let previewText = `${secToTime(desiredTime)} ${this.doubs.getSlide(desiredTime).text}`;
      tooltip.tooltipster('content', previewText);
    });

    // setup progress tooltip
    $(document).ready(() => {

      const snapToMouse = (instance, helper, position) => {
        // get the x-position of the mouse, relative to the viewport...
        let pageX = progressEl.offsetLeft + mouseX;

        // ...and the width of the tooltip...
        let tooltipWidth = $(helper.tooltip).width();

        // ...then align the tooltip arrow with the mouse...
        position.target = pageX;

        // ...and center the tooltip on the arrow.
        position.coord.left = position.target - (tooltipWidth / 2);

        // Finally, adjust tooltip position to prevent it from
        // going outside the viewport.
        let leftX  = position.coord.left;
        if (leftX < 0) { position.coord.left += -leftX; }

        let rightX = leftX + tooltipWidth;
        let windowWidth = $(window).width();
        if (rightX > windowWidth) { position.coord.left -= rightX - windowWidth; }

        return position;
      };

      tooltip.tooltipster({
        trigger: 'custom',
        triggerOpen:  { mouseenter: true },
        triggerClose: { mouseleave: true },
        theme: 'tooltip-progress-theme',
        functionPosition: snapToMouse,
        updateAnimation: null
      });
    });
  }

  // getter used here to allow updates to flow from the service
  get doubs() { return this.doubsService.doubs; }
}

module.exports = Progress;
