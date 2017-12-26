/*
play/pause - spacebar
skip - left and right (left could also be a replay slide on the first click)
volume - up and down
mute - m
*/

const Player = require('./Player/Player.js');

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

$('#Video').attr('src', '../IgnoreThis/hope.mp4');

// add keyboard shortcuts
require('./keybindings.js')(tags);
