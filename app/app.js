const Player = require('./Player/Player.js');

// initialize tooltipster (only used once)
$(document).ready(function() {
  $('.tooltip-onclick').tooltipster({
    trigger: 'custom',
    triggerOpen: {
      click: true
    },
    triggerClose: {
      mouseleave: true
    }
  });
});

const tags = {
  player: '#Player',
  instructions: '#instructions',
  skipRegion: '.skip',
  skipBack: '#skip-back',
  skipForward: '#skip-forward',
  slide: '#Slide',
  definition: '#definition',
  slideText: '#slide-text',
  controls: '#Controls',
  progress: '#Progress',
  playPauseBtn: '#play-pause-btn',
  muteBtn: '#mute-btn',
  volumeSldr: '#volume-sldr',
  timeBtn: '#time-btn',
  cTime: '#current-time',
  duration: '#duration',
  autoReplayBtn: '#auto-replay-btn',
  videoSourceBtn: '#video-source-btn',
  subsBtn: '#subs-btn',
  fullscreenBtn: '#fullscreen-btn',
  video: '#Video',
  videoContainer: '#video-container'
};

const player = new Player(tags);

$('#Video').attr('src', '../IgnoreThis/hope.mp4') ;
