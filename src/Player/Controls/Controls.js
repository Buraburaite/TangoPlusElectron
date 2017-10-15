const changeSourceFactory = require('../Video/factories/changeSource.js');

class Controls {

  constructor(tagTree) {
    this.tag = tagTree.compTag;

    // LOAD-BTN:CLICK

    $('#load-btn').click(changeSourceFactory(tagTree.videoTag));
  }
}

module.exports = Controls;
