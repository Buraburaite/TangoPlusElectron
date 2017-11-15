module.exports = (tags, transformTime) => {
  const videoEl = $(tags.video).get(0);

  const changeTime = () => {
    let newTime = transformTime(videoEl.currentTime);

    //limit to the range of the video
    newTime = Math.max(0, newTime);
    newTime = Math.min(newTime, videoEl.duration);

    videoEl.currentTime = newTime;
  };

  return changeTime;
};
