const openFile = require('./factories/openFile.js');

class Controls {

  constructor(tags) {
    this.tag = tags.controlsTag;
    this.jel = $(this.tag);
  }
}
