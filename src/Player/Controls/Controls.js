const changeSourceFactory = require('../Video/factories/changeSource.js');

class Controls {

  constructor(tags) {
    this.tag = tags.controlsTag;
    this.jel = $(this.tag);

    // LOAD-BTN:CLICK

    $('#load-btn').click(changeSourceFactory(tags.videoTag));
  }
}

module.exports = Controls;
