const Player = require('./Player/Player.js');
const player = new Player(
  {
    playerTag: '#Player',
    controlsTag: '#Controls',
    progressTag: '#Progress',
    loadTag: '#load-btn',
    fullscreenTag: '#fullscreen-btn',
    videoTag: '#Video',
  }
);

$('#Video').attr('src', 'assets/diver.mp4');
