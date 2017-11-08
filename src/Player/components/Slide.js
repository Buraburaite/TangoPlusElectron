const define = require('../functions/define.js');

class Slide {

  constructor(tags, services) {

    // Save our connection to the application state
    this.doubsService = services.doubtitles;

    const jSlide = $(tags.slide);
    const videoEl = $(tags.video).get(0);

    // #Video:TIMEUPDATE
    $(tags.video).bind(
      'timeupdate',
      () => {
        // if there's no doubtitles instance, do nothing...
        if (!this.doubs) { return; }
        // ...otherwise, update #slide html contents to match the correct slide
        const text = this.doubs.getSlide(videoEl.currentTime).text;
        jSlide.text(text);
      }
    );

    $(tags.slide).click(() => {
      const def = define('猫')
      .then((matchs) => {
        console.log(matchs);
      })
      .catch((err) => {
        console.log(err);
      });
    });
  }

  // getter used here to allow updates to flow from the service
  get doubs() { return this.doubsService.doubs; }
}

module.exports = Slide;
