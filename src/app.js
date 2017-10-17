const Player = require('./Player/Player.js');
const player = new Player(
  {
    player: '#Player',
    controls: '#Controls',
    progress: '#Progress',
    playPauseBtn: '#play-pause-btn',
    muteBtn: '#mute-btn',
    autoReplayBtn: '#auto-replay-btn',
    loadBtn: '#load-btn',
    fullscreenBtn: '#fullscreen-btn',
    video: '#Video',
  }
);

$('#Video').attr('src', 'assets/diver.mp4');
