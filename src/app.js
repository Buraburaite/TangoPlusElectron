const electron = require('electron');
const dialog = electron.remote.dialog;

const Player = require('./Player/Player.js');
const player = new Player('#Player');

const openFile = () => {
  dialog.showOpenDialog(
    {
      filters: [
        { name: 'video (*.mp4)', extensions: ['mp4'] },
        { name: 'audio (*.mp3)', extensions: ['mp3'] }
      ]
    },
    (fileNames) => { $('#Player').attr('src', fileNames[0]); }
  );
};
