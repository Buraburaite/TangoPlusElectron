module.exports = (tags) => {

  // Functions to be bound to keys
  const playPause = require('./Player/factories/playPause.js')(tags);

  // Bind keys
  $(document).keyup((e) => {
    switch(e.which) {

      case 32: // spacebar
      playPause();
      break;
      case 37: // left arrow
      console.log('left clicked');
      break;
      case 39: // right arrow
      console.log('right clicked');
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
