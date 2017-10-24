const dialog = require('electron').remote.dialog;
const leftpad = require('left-pad');

module.exports = (tags) => {
  const jVideo = $(tags.video);
  const jDuration = $(tags.duration);

  const changeSource = (filepath) => {
    jVideo.attr('src', filepath);
    setTimeout(() => jDuration.text(secToTime(jVideo.get(0).duration)), 2000);

  };

  const secToTime = (secs) => { // 1398 => 23:18
    let mins = Math.floor(secs / 60);
    secs     = Math.floor(secs % 60);

    secs = leftpad(secs, 2, '0');

    return mins + ':' + secs;
  };

  const askForSource = () => {
    dialog.showOpenDialog( // open a file dialog, async returns list of paths
      {
        filters: [
          { name: 'media (*.mp4, *mp3)', extensions: ['mp4', 'mp3'] },
          { name: 'video (*.mp4)', extensions: ['mp4'] },
          { name: 'audio (*.mp3)', extensions: ['mp3'] },
        ]
      },
      changeSource // callback
    );
  };

  return askForSource;
};
