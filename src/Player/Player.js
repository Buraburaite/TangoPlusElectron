// Scripts for our subcomponents
const Controls = require('./components/Controls.js');
const Progress = require('./components/Progress.js');
const Video = require('./components/Video.js');

// Factories whose return functions will be passed to various event listeners
const theaterizeFactory = require('./factories/theaterize.js');
const playPauseFactory = require('./factories/playPause.js');
const changeTimeFactory = require('./factories/changeTime.js');

class Player {

  constructor(tags) {

    this.controls = new Controls(tags);
    this.progress = new Progress(tags);
    this.video = new Video(tags);

    const jSkip = $(tags.skipRegion);

    // window:RESIZE
    // make video scale with window
    $(window).resize(theaterizeFactory(tags));

    // #video-container:CLICK
    $(tags.videoContainer).click(playPauseFactory(tags));

    // .skip:CLICK
    jSkip.click(playPauseFactory(tags));

    // .skip:DOUBLECLICK
    jSkip.dblclick(
      (e) => {
        $(e.target).animate(
          {opacity: 0.5 },
          200,
          () => $(e.target).animate({ opacity: 0 }, 100)
        );
      }
    );

    // #skip-back:DOUBLECLICK
    $(tags.skipBack).dblclick(changeTimeFactory(tags, (t) => t - 10));

    // #skip-forward:DOUBLECLICK
    $(tags.skipForward).dblclick(changeTimeFactory(tags, (t) => t + 10));
  }


}

module.exports = Player;
