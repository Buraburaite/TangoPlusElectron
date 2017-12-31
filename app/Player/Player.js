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

    const jSkip = $(tags.skipBack + ', ' + tags.skipForward);
    const jVideo = $(tags.video);

    // Factories to make custom event listener callbacks
    const flashIconFactory = require('./factories/flashIcon.js');

    // Functions for event listeners
    const theaterize = require('./factories/theaterize.js')(tags, services);
    const playPause  = require('./factories/playPause.js')(tags, services);

    // window:RESIZE
    // make video scale with window
    $(window).resize(theaterize);
    theaterize(); // initialize video dimensions

    // #Video:LOADSTART
    jVideo.on('loadstart', () => $(tags.instructions).hide());

    // #Video:PLAY
    jVideo.on('play',  flashIconFactory('play'));

    // #Video:PAUSE
    jVideo.on('pause', flashIconFactory('pause'));

    // #Video:VOLUMECHANGE
    const flashUp   = flashIconFactory('volume-up');
    const flashDown = flashIconFactory('volume-down');
    const flashOff  = flashIconFactory('volume-off');

    jVideo.on(
      'volumechange',
      (e) => {
        // flash volume change
        let newVol = e.target.volume;
        if      (newVol > 0.5) { flashUp(); }
        else if (newVol > 0)   { flashDown(); }
        else                   { flashOff(); }
      }
    );

    // #video-container:CLICK
    $(tags.videoContainer).click(playPause);

  }

}

module.exports = Player;
