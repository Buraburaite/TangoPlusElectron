module.exports = (tags) => {
  const videoEl = $(tags.video).get(0);

  const fullscreen = () => {
    videoEl.webkitRequestFullscreen();
  };

  return fullscreen;
};
