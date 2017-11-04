const Doubtitles = require('../../Doubtitles/Doubtitles.js');

let instance;

class DoubtitlesService {

  constructor() {

    // enforce singleton pattern
    if (!instance) { instance = this; }
    else           { return  instance; }

    // initial value for testing
    this._doubs = new Doubtitles(__dirname + '/../../assets/hanzawa.srt');
  }

  get doubs() { return this._doubs; }

  changeDoubs(filepath) {
    this._doubs = new Doubtitles(filepath);
  }
}

module.exports = DoubtitlesService;
