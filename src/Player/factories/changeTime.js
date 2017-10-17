module.exports = (tags, transformTime) => {
  const videoEl = $(tags.video).get(0);

  const changeTime = () => {
    videoEl.currentTime = transformTime(videoEl.currentTime);
  };

  return changeTime;
};
