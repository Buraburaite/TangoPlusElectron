const Player = require('./Player/Player.js');
const player = new Player(
  // {
  //   compTag: '#Player', // compTag is short for 'this component's Tag'
  //   videoTag: '#Video',
  //   controls: {
  //     compTag: '#Controls',
  //     loadTag: '#load-btn',
  //     fullscreenTag: '#fullscreen-btn',
  //     progressTag: '#progress-bar',
  //     videoTag: '#Video'
  //   },
  //   video: {
  //     compTag: '#Video',
  //     progressTag: '#progress-bar'
  //   }
  // }
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
