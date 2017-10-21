const Player = require('./Player/Player.js');
const player = new Player(
  {
    player: '#Player',
    skipBack: '#skip-back',
    skipForward: '#skip-forward',
    controls: '#Controls',
    progress: '#Progress',
    playPauseBtn: '#play-pause-btn',
    muteBtn: '#mute-btn',
    volumeSldr: '#volume-sldr',
    autoReplayBtn: '#auto-replay-btn',
    loadBtn: '#load-btn',
    fullscreenBtn: '#fullscreen-btn',
    video: '#Video',
  }
);

$('#Video').attr('src', 'assets/diver.mp4');
