const askForSourceFactory = require('../factories/askForSource.js');
const changeVolumeFactory = require('../factories/changeVolume.js');
const fullscreenFactory = require('../factories/fullscreen.js');
const muteUnmuteFactory = require('../factories/muteUnmute.js');
const playPauseFactory = require('../factories/playPause.js');

class Controls {

  constructor(tags) {

    this.tags = tags;
    const jVideo = $(tags.video);
    const jVolSldr = $(tags.volumeSldr);

    // various buttons:CLICK
    $(tags.playPauseBtn).click( playPauseFactory(tags));
    $(tags.loadBtn).click(      askForSourceFactory(tags));
    $(tags.fullscreenBtn).click(fullscreenFactory(tags));
    $(tags.autoReplayBtn).click(
      () => $(tags.autoReplayBtn).toggleClass('enabled')
    );

    // ensure playPauseBtn icon always matches the video state
    const jPlayPauseIcon = $(tags.playPauseBtn + ' i');
    jVideo.on(
      'play pause', // #Video:PLAY & #Video:PAUSE
      () => jPlayPauseIcon.toggleClass('fa-play fa-pause')
    );

    // NOTE: always change the video's volume through the video slider
    $(tags.volumeSldr).on('input', changeVolumeFactory(tags, true));

    let preMuteVol = 0.5;
    $(tags.muteBtn).click(
      () => {
        let currVol = jVolSldr.val();

        if (currVol > 0) { // if volume is greater than 0, mute
          preMuteVol = currVol;
          jVolSldr.val(0);
        } else {          // else, 'unmute'
        jVolSldr.val(preMuteVol);
      }

      jVolSldr.trigger('input'); // we need to trigger the event manually
    }
  );

  // automatically restart the video when video ends
  jVideo.on(
    'ended',
    () => {
      if (this.isAutoReplayEnabled()) {
        jVideo.get(0).play();
      }
    }
  );

}

isAutoReplayEnabled() {
  return $(this.tags.autoReplayBtn).hasClass('enabled');
}
}

module.exports = Controls;
