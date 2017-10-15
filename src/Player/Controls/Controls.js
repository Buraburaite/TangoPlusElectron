const changeVideoSourceFactory = require('./factories/changeVideoSource.js');

class Controls {

  constructor(tags) {
    this.tag = tags.controlsTag;
    this.jel = $(this.tag);

    // LOAD-BTN:CLICK

    $('#load-btn').click(changeVideoSourceFactory(tags.videoTag));
  }
}

module.exports = Controls;
