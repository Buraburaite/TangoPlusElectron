const Doubtitles = require('../Doubtitles/Doubtitles.js');
const watchAPI = require('chokidar');

let instance;

class DoubtitlesService {

  constructor(tags) {

    // enforce singleton pattern
    if (!instance) { instance = this; }
    else           { return  instance; }

    this.tags = tags;

    // used in this.changeDoubs().
    this.watcher = null;
    this.prevFilepath = null;

  }

  get doubs() { return this._doubs; }

  changeDoubs(filepath) {
    this._doubs = new Doubtitles(filepath);

    // HACK: trigger timeupdate to update current slide contents
    $(this.tags.video).trigger('timeupdate');

    if (filepath !== this.prevFilepath) {
      // update doubs automatically on
      this.watcher = watchAPI.watch(filepath);
      this.watcher.on('change', path => this.changeDoubs(path));

      this.prevFilepath = filepath;
    }
  }
}

module.exports = DoubtitlesService;
