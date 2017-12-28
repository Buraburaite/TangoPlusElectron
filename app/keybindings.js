module.exports = (tags, services) => {

  // Functions to be bound to keys
  const playPause = require('./Player/factories/playPause.js')(tags);

  const changeTimeFactory = require('./Player/factories/changeTime.js');
  const rewind      = changeTimeFactory(tags, services, 'skip back');
  const fastForward = changeTimeFactory(tags, services, 'skip forward');

  // Bind keys
  $(document).keyup((e) => {
    switch(e.which) {

      case 32: // spacebar
      playPause();
      break;
      case 37: // left arrow
      rewind();
      break;
      case 39: // right arrow
      fastForward();
      break;
      case 38: // up arrow
      console.log('up clicked');
      break;
      case 40: // down arrow
      console.log('down clicked');
      break;
      case 77: // m
      console.log('m-key clicked');
      break;

      default: return;
    }
  });
}
