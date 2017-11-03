class Slide {

  constructor(tags, doubs) {

    const jSlide = $(tags.slide);
    const videoEl = $(tags.video).get(0);

    // #Video:TIMEUPDATE
    $(tags.video).bind(
      'timeupdate',
      () => {
        jSlide.text(doubs.getSlide(videoEl.currentTime).text);
      }
    );
  }
}

module.exports = Slide;
