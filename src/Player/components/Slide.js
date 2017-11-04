class Slide {

  get doubs() { return this.doubsService.doubs; }

  constructor(tags, services) {

    // Save our connection to the application state
    this.doubsService = services.doubtitles;

    const jSlide = $(tags.slide);
    const videoEl = $(tags.video).get(0);

    // #Video:TIMEUPDATE
    $(tags.video).bind(
      'timeupdate',
      () => {
        if (!this.doubs) { return; }
        const text = this.doubs.getSlide(videoEl.currentTime).text;
        jSlide.text(text);
      }
    );
  }
}

module.exports = Slide;
