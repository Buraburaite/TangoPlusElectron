const askForSourceFactory = require('../factories/askForSource.js');
const fullscreenFactory = require('../factories/fullscreen.js');
const playPauseFactory = require('../factories/playPause.js');

class Controls {

  constructor(tags) {

    this.tags = tags;

    // various buttons:CLICK
    $(tags.playPauseBtn).click( playPauseFactory(tags));
    $(tags.loadBtn).click(      askForSourceFactory(tags));
    $(tags.fullscreenBtn).click(fullscreenFactory(tags));
    $(tags.autoReplayBtn).click(
      () => $(tags.autoReplayBtn).toggleClass('enabled')
    );

    // automatically restart the video when video ends
    $(tags.video).on(
      'ended',
      () => {
        if (this.isAutoReplayEnabled()) {
          $(tags.video).get(0).play();
        }
      }
    );

    // ensure playPauseBtn icon always matches the video state
    const jPlayPauseIcon = $(tags.playPauseBtn + ' i');
    $(tags.video).on(
      'play pause', // #Video:PLAY & #Video:PAUSE
      () => jPlayPauseIcon.toggleClass('fa-play fa-pause')
    );

    let preVol = 0;
    $(tags.muteBtn).click(() => {
      let icon = $(tags.muteBtn + ' i');
      if (icon.hasClass('fa-volume-up')) {
        preVol = $(tags.video).prop('volume');
        icon.attr('class', 'fa fa-volume-off');
        $(tags.video).prop('volume', 0);
      } else {
        icon.attr('class', 'fa fa-volume-up');
        $(tags.video).prop('volume', preVol);
      }
    });
    $(tags.volumeSldr).on('input', (e) => $(tags.video).prop('volume', e.target.value / 100));

  }

  isAutoReplayEnabled() {
    return $(this.tags.autoReplayBtn).hasClass('enabled');
  }
}

module.exports = Controls;
