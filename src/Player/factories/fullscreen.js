module.exports = (tags) => {
  const videoEl = $(tags.videoTag).get(0);

  const fullscreen = () => {
    videoEl.webkitRequestFullscreen();
  };

  return fullscreen;
};
