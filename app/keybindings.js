module.exports = (tags, services) => {

  // Functions to be bound to keys
  const playPause  = require('./Player/factories/playPause.js' )(tags, services);
  const muteUnmute = require('./Player/factories/muteUnmute.js')(tags, services);
  const changeTimeFactory = require('./Player/factories/changeTime.js');
  const rewind      = changeTimeFactory(tags, services, 'skip back');
  const fastForward = changeTimeFactory(tags, services, 'skip forward');

  const jVideo = $(tags.video);

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
      jVideo.prop('volume', constrainVolume(jVideo.prop('volume') + 0.05));
      break;
      case 40: // down arrow
      jVideo.prop('volume', constrainVolume(jVideo.prop('volume') - 0.05));
      break;
      case 77: // m
      muteUnmute();
      break;

      default: return;
    }
  });

  const constrainVolume = (newVol) => {
    // limit value to [0,1]
    newVol = Math.max(0, newVol);
    newVol = Math.min(newVol, 1);
    return newVol;
  };
}
