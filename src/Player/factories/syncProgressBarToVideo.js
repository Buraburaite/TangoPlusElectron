const dialog = require('electron').remote.dialog;

module.exports = (videoTag, progressTag) => {
  const videoEl = $(videoTag).get(0);
  const progressEl = $(progressTag).get(0);

  const syncProgressBarToVideo = (e) => {
    progressEl.value = videoEl.currentTime / videoEl.duration;
  };

  return syncProgressBarToVideo;
};
