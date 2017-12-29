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

    // #skip-back:DOUBLECLICK
    $(tags.skipBack).dblclick(changeTimeFactory(tags, services, 'skip back'));
    $(tags.skipForward).dblclick(changeTimeFactory(tags, services, 'skip forward'));
  }
}

module.exports = Player;
