// Scripts for our subcomponents
const Controls = require('./components/Controls.js');
const Progress = require('./components/Progress.js');
const Slide = require('./components/Slide.js');
const Video = require('./components/Video.js');

// Factories whose return functions will be passed to various event listeners
const theaterizeFactory = require('./factories/theaterize.js');
const playPauseFactory = require('./factories/playPause.js');
const changeTimeFactory = require('./factories/changeTime.js');

// Services, or singleton classes that centralize and protect certain pieces
// of state in our application
const DoubtitlesService = require('./services/doubtitles.service.js');

class Player {

  constructor(tags) {

    this.services = {
      doubtitles: new DoubtitlesService()
    };

    this.slide = new Slide(tags, this.services);
    this.controls = new Controls(tags, this.services);
    this.progress = new Progress(tags, this.services);
    this.video = new Video(tags);

    const jSkip = $(tags.skipRegion);

    // window:RESIZE
    // make video scale with window
    const theaterize = theaterizeFactory(tags);
    $(window).resize(theaterize);
    theaterize();

    // #Video.LOADSTART
    $(tags.video).on('loadstart', () => $(tags.instructions).hide());

    // #video-container:CLICK
    $(tags.videoContainer).click(playPauseFactory(tags));

    // .skip:CLICK
    jSkip.click(playPauseFactory(tags));

    // .skip:DOUBLECLICK
    jSkip.dblclick(
      (e) => {
        $(e.target).animate(
          { opacity: 0.5 },
          200,
          () => $(e.target).animate({ opacity: 0 }, 100)
        );
      }
    );

    const areThereDoubs = () => !!this.doubs;

    // #skip-back:DOUBLECLICK
    $(tags.skipBack).dblclick(changeTimeFactory(tags,
      (t) => areThereDoubs() ? this.doubs.getPrevSlide().startTime : t - 10)
    );

    // #skip-forward:DOUBLECLICK
    $(tags.skipForward).dblclick(changeTimeFactory(tags,
      (t) => areThereDoubs() ? this.doubs.getNextSlide().startTime : t + 10)
    );
  }

  get doubs() { return this.services.doubtitles.doubs; }


}

module.exports = Player;
