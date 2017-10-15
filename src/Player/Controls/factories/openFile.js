const electron = require('electron');
const dialog = electron.remote.dialog;

const openFile = (videoTag) => {
  const jVideo = $(videoTag);

  dialog.showOpenDialog(
    {
      filters: [
        { name: 'video (*.mp4)', extensions: ['mp4'] },
        { name: 'audio (*.mp3)', extensions: ['mp3'] }
      ]
    },
    (fileNames) => { jVideo.attr('src', fileNames[0]); }
  );
};
