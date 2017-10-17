module.exports = (videoTag) => {
  const videoEl = $(videoTag).get(0); // the video to play or pause

  return () => {
    if (videoEl.readyState > 2) { // meaning the video can play, see HTML5 docs
      if (videoEl.paused || videoEl.ended){
        videoEl.play();
      } else {
        videoEl.pause();
      }
    }
  };
};
