const flashIconFactory = require('./flashIcon.js');

module.exports = (tags, services, transform) => {
  const videoEl = $(tags.video).get(0);

  const changeTime = () => {

    let newTime;

    if (typeof(transform) === 'string') {

      switch(transform) {
        case 'restart slide':
        newTime = doubs().getCurrentSlide().startTime;
        flashBack();
        break;
        case 'skip back':
        newTime = areThereDoubs() ? smartRewind() : videoEl.currentTime - 10;
        flashBack();
        break;
        case 'skip forward':
        newTime = areThereDoubs() ? doubs().getNextSlide().startTime : videoEl.currentTime + 10;
        flashForward();
        break;

        default: return;
      }
    }
    else if (typeof(transform) === 'function') {
      newTime = transform(videoEl.currentTime);
    }

    if (newTime) {
      //limit to the range of the video
      newTime = Math.max(0, newTime);
      newTime = Math.min(newTime, videoEl.duration);

      videoEl.currentTime = newTime;
    }
  };

  const areThereDoubs = () => !!services.doubtitles.doubs;
  const doubs = () => services.doubtitles.doubs; // doubs is stateful

  // I had difficulty naming this function, but essentially
  // the first time you call it, it will restart the current slide.
  // However, if you continue to rapidly call the function,
  // it will instead go back further to previous slides.
  // It's similar to throttling, but instead of preventing
  // rapid calls it gives them a different functionality.
  let recentlyCalled = false;
  let timeout = setTimeout(() => { recentlyCalled = false }, 200);
  const smartRewind = () => {
    let time;
    if (recentlyCalled) { time = doubs().getPrevSlide().startTime; }
    else { time = doubs().getCurrentSlide().startTime; }

    clearTimeout(timeout);
    recentlyCalled = true;
    timeout = setTimeout(() => { recentlyCalled = false; }, 1000);

    return time;
  };

  const flashBack = flashIconFactory('step-backward');
  const flashForward = flashIconFactory('step-forward');

  return changeTime;
};
