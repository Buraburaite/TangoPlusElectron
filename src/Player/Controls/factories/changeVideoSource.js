const dialog = require('electron').remote.dialog;

module.exports = (videoTag) => {
  const jVideo = $(videoTag);

  return () => {
    dialog.showOpenDialog( // open a file dialog, async returns list of paths
      {
        filters: [
          { name: 'video (*.mp4)', extensions: ['mp4'] },
          { name: 'audio (*.mp3)', extensions: ['mp3'] }
        ]
      },
      (fileNames) => { jVideo.attr('src', fileNames[0]); } // callback
    );
  };
};
