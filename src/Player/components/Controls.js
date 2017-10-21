const askForSourceFactory = require('../factories/askForSource.js');
const playPauseFactory = require('../factories/playPause.js');

class Controls {

  constructor(tags) {

    this.tags = tags;
    const jVideo = $(tags.video);

    // various buttons:CLICK (these functions need to be reusable, hence factories)
    $(tags.playPauseBtn).click( playPauseFactory(tags));
    $(tags.loadBtn).click(      askForSourceFactory(tags));

    // #fullscreen-btn:CLICK
    $(tags.fullscreenBtn).click(() => jVideo.get(0).webkitRequestFullscreen());

    // #auto-replay-btn:CLICK
    $(tags.autoReplayBtn).click(
      () => $(tags.autoReplayBtn).toggleClass('enabled')
    );

    // #Video:PLAY || PAUSE
    jVideo.on(
      'play pause', // #Video:PLAY & #Video:PAUSE
      () => $(tags.playPauseBtn + ' i').toggleClass('fa-play fa-pause')
    );

    // #Video:VOLUMECHANGE
    // NOTE: Always change volume directly, not through altering the
    // slider, simulating a click, or anything else.
    jVideo.on(
      'volumechange',
      (e) => {

        let newVol = e.target.volume;

        // 1) update slider's value
        $(tags.volumeSldr).val(newVol);

        // 2) update mute button's icon
        let iconClass = 'fa fa-volume-';

        if      (newVol > 0.5) { iconClass += 'up'; }
        else if (newVol > 0)   { iconClass += 'down'; }
        else                   { iconClass += 'off'; }

        $(tags.muteBtn + ' i').attr('class', iconClass);
      }
    );

    // initialize slider (works because this is loaded after html)
    $(tags.volumeSldr).val(jVideo.prop('volume'));

    // #volume-sldr:INPUT
    $(tags.volumeSldr).on('input', (e) => jVideo.prop('volume', e.target.value));

    // #mute-btn:CLICK
    let preMuteVol = 0.5; // 0.5 is a failsafe value
    $(tags.muteBtn).click(
      () => {
        let currVol = jVideo.prop('volume');

        if (currVol > 0) {
          preMuteVol = currVol;
          jVideo.prop('volume', 0);
        }
        else { jVideo.prop('volume', preMuteVol); }
      }
    );

    // #Video:ENDED
    jVideo.on(
      'ended',
      () => { // automatically restart the video when video ends
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
