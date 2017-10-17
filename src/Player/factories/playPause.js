module.exports = (tags) => {
  const videoEl = $(tags.videoTag).get(0); // the video to play or pause
  const jBtnImage = $(tags.playPauseTag + ' i');

  return () => {
    if (videoEl.readyState > 2) { // meaning the video can play, see HTML5 docs
      if (videoEl.paused || videoEl.ended){
        videoEl.play();
        jBtnImage.removeClass('fa-pause');
        jBtnImage.addClass('fa-play');
      } else {
        videoEl.pause();
        jBtnImage.removeClass('fa-play');
        jBtnImage.addClass('fa-pause');
      }
    }
  };
};
