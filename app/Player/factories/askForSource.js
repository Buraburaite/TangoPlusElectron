const dialog = require('electron').remote.dialog;

module.exports = (tags, services) => {
  const jVideo = $(tags.video);

  const changeSource = (filepath) => {
    jVideo.attr('src', filepath[0]);
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
