const dialog = require('electron').remote.dialog;

module.exports = (tags, services) => {
  const doubsService = services.doubtitles;
  const videoEl = $(tags.video).get(0);

  const changeSubs = (filepaths) => {

    // exit if no files were selected
    if (!filepaths) { return; }

    doubsService.changeDoubs(filepaths[0]);
  };

  const askForSubs = () => {
    videoEl.pause();
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
