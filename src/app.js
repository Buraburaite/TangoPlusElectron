const Player = require('./Player/Player.js');
const player = new Player(
  {
    compTag: '#Player', // compTag is short for 'this component's Tag'
    videoTag: '#Video',
    controls: {
      compTag: '#Controls',
      loadTag: '#load-btn',
      videoTag: '#Video'
    },
    video: {
      compTag: '#Video'
    }
  }
);
