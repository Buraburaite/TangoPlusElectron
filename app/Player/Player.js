// Scripts for our subcomponents
const Controls = require('./components/Controls.js');
const Progress = require('./components/Progress.js');
const Slide = require('./components/Slide.js');
const Video = require('./components/Video.js');

class Player {

  constructor(tags, services) {

    this.slide = new Slide(tags, services);
    this.controls = new Controls(tags, services);
    this.progress = new Progress(tags, services);
    this.video = new Video(tags, services);

    const jFlasher = $(tags.flasher);
    const jSkip = $(tags.skipBack + ', ' + tags.skipForward);
    const jVideo = $(tags.video);

    // Functions for event listeners
    const theaterize = require('./factories/theaterize.js')(tags, services);
    const playPause  = require('./factories/playPause.js')(tags, services);

    // Factories to make custom event listener callbacks
    const changeIconFactory = require('./factories/changeIcon.js');

    // window:RESIZE
    // make video scale with window
    $(window).resize(theaterize);
    theaterize(); // initialize video dimensions

    // #Video:LOADSTART
    jVideo.on('loadstart', () => $(tags.instructions).hide());

    // custom event to trigger flash animation on .flasher elements
    jFlasher.on('flasher:flash', this._flashAnimation);

    // #Video:PLAY & PAUSE
    // trigger flash on either play or pause
    const playPauseFlasher = $(tags.centerFlasher);
    jVideo.on('play pause', (e) => playPauseFlasher.trigger('flasher:flash'));
    // change the icon to match the new state
    const playPauseIcon = $(tags.centerFlasher + ' i');
    jVideo.on('play',  changeIconFactory(playPauseIcon, 'play'));
    jVideo.on('pause', changeIconFactory(playPauseIcon, 'pause'));

    // #video-container:CLICK
    $(tags.videoContainer).click(playPause);

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
