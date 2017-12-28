module.exports = (tags, services) => {
  const videoEl = $(tags.video).get(0);

  playPause = () => {
    if (videoEl.readyState > 2) { // meaning the video can play, see HTML5 docs
      if (videoEl.paused || videoEl.ended){
        videoEl.play();
      } else {
        videoEl.pause();
      }
    }
  };

  return playPause;
};
