const Player = require('./Player/Player.js');
const player = new Player(
  {
    playerTag: '#Player',
    controlsTag: '#Controls',
    videoTag: '#Video',
    loadTag: '#load-btn',
    fullscreenTag: '#fullscreen-btn',
    progressTag: '#progress-bar',
  }
);

$('#Video').attr('src', 'assets/diver.mp4');
