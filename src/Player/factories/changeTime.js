module.exports = (tags, transformTime) => {
  const videoEl = $(tags.videoTag).get(0);

  const changeTime = () => {
    videoEl.currentTime = transformTime(videoEl.currentTime);
  };

  return changeTime;
};
