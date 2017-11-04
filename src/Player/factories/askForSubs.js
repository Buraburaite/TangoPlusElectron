const dialog = require('electron').remote.dialog;

module.exports = (tags, services) => {

  const doubsService = services.doubtitles;

  const changeSubs = (filepath) => {
    doubsService.changeDoubs(filepath[0]);
  };

  const askForSubs = () => {

    dialog.showOpenDialog( // open a file dialog, async returns list of paths
      {
        filters: [
          { name: 'subtitles (*.srt)', extensions: ['srt'] },
        ]
      },
      changeSubs // callback
    );
  };

  return askForSubs;
};
