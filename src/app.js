const Player = require('./Player/Player.js');

tags = {
  player: '#Player',
  skipRegion: '.skip',
  skipBack: '#skip-back',
  skipForward: '#skip-forward',
  slide: '#Slide',
  controls: '#Controls',
  progress: '#Progress',
  playPauseBtn: '#play-pause-btn',
  muteBtn: '#mute-btn',
  volumeSldr: '#volume-sldr',
  timeBtn: '#time-btn',
  cTime: '#current-time',
  duration: '#duration',
  autoReplayBtn: '#auto-replay-btn',
  loadBtn: '#load-btn',
  fullscreenBtn: '#fullscreen-btn',
  video: '#Video',
  videoContainer: '#video-container'
};

const player = new Player(tags);

$('#Video').attr('src', 'assets/diver.mp4');


$(document).ready(function() {
  $('.tooltip').tooltipster({
    trigger: 'custom',
    triggerOpen: {
      click: true
    },
    triggerClose: {
      mouseleave: true
    }
  });
});
