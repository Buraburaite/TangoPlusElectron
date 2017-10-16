module.exports = (videoTag) => {
  const videoEl = $(videoTag).get(0);

  const fullscreen = () => {
    videoEl.webkitRequestFullscreen();
  };

  return fullscreen;
};
