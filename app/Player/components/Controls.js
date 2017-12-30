const clipboard = require('electron').clipboard;

class Controls {

  constructor(tags, services) {

    this.tags = tags;
    const jVideo = $(tags.video);

    // Functions for event listeners
    const askForSource = require('../factories/askForSource.js')(tags, services);
    const askForSubs   = require('../factories/askForSubs.js')(tags, services);
    const playPause    = require('../factories/playPause.js')(tags, services);
    const muteUnmute   = require('../factories/muteUnmute.js')(tags, services);
    const secToTimestamp = require('../functions/secToTimestamp.js');

    // Factories to make custom event listener callbacks
    const changeIconFactory = require('../factories/changeIcon.js');


    // various buttons:CLICK (these functions need to be reusable, hence factories)
    $(tags.playPauseBtn).click(playPause);
    $(tags.videoSourceBtn).click(askForSource);
    $(tags.subsBtn).click(askForSubs);

    // #auto-replay-btn:CLICK
    $(tags.autoReplayBtn).click(
      () => $(tags.autoReplayBtn).toggleClass('enabled')
    );

    // #Video:PLAY & PAUSE
    const playPauseIcon = $(tags.playPauseBtn + ' i');
    jVideo.on('play',  changeIconFactory(playPauseIcon, 'play'));
    jVideo.on('pause', changeIconFactory(playPauseIcon, 'pause'));

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

    // initialize volume (therefore syncing everything else)
    jVideo.prop('volume', 0.5);

    // #volume-sldr:INPUT
    $(tags.volumeSldr).on('input', (e) => jVideo.prop('volume', e.target.value));

    // #mute-btn:CLICK
    $(tags.muteBtn).click(muteUnmute);

    // #timeBtn:CLICK
    $(tags.timeBtn).click(playPause);

    // copy timestamp to clipboard on click
    $(tags.timeBtn).click(() => {
      clipboard.writeText(secToTimestamp(jVideo.get(0).currentTime));
    });

    // setup timeBtn's tooltip
    $(document).ready(() => {
      $('.tooltip-onclick').tooltipster({
        trigger: 'custom',
        triggerOpen:  { click: true },
        triggerClose: { mouseleave: true }
      });
    });

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
