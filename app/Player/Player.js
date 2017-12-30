// Scripts for our subcomponents
const Controls = require('./components/Controls.js');
const Progress = require('./components/Progress.js');
const Slide = require('./components/Slide.js');
const Video = require('./components/Video.js');

// Factories whose return functions can be passed to various event listeners
const theaterizeFactory = require('./factories/theaterize.js');
const playPauseFactory = require('./factories/playPause.js');
const changeTimeFactory = require('./factories/changeTime.js');

class Player {

  constructor(tags, services) {

    this.slide = new Slide(tags, services);
    this.controls = new Controls(tags, services);
    this.progress = new Progress(tags, services);
    this.video = new Video(tags, services);

    const jFlasher = $(tags.flasher);
    const jSkip = $(tags.skipBack + ', ' + tags.skipForward);

    // window:RESIZE
    // make video scale with window
    const theaterize = theaterizeFactory(tags, services);
    $(window).resize(theaterize);
    theaterize();

    // #Video:LOADSTART
    $(tags.video).on('loadstart', () => $(tags.instructions).hide());

    // #Video:PLAY || PAUSE
    $(tags.video).on(
      'play pause',
      () => {
        $(tags.centerFlasher).trigger('flasher:flash');
        $(tags.centerFlasher + ' i').toggleClass('fa-play fa-pause');
      }
    );

    // #video-container:CLICK
    $(tags.videoContainer).click(playPauseFactory(tags, services));

    // custom event to trigger flash animation on .flasher elements
    jFlasher.on('flasher:flash', this._flashAnimation);
  }

  _flashAnimation(e) {
    $(e.target).animate(
      { opacity: 0.5 },
      200,
      () => $(e.target).animate({ opacity: 0 }, 100)
    );
  };
}

module.exports = Player;
