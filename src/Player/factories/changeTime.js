const dialog = require('electron').remote.dialog;

module.exports = (videoTag, transformTime) => {
  const videoEl = $(videoTag).get(0);

  const changeTime = () => {
    videoEl.currentTime = transformTime(videoEl.currentTime);
  };

  return changeTime;
};
