const dialog = require('electron').remote.dialog;

module.exports = (tags, services) => {
  const jVideo = $(tags.video);
  const videoEl = jVideo.get(0);

  const changeSource = (filepaths) => {

    // exit if no files were selected
    if (!filepaths) { return; }

    jVideo.attr('src', filepaths[0]);
  };


  const askForSource = () => {
    videoEl.pause();
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
