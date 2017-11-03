const Slide = require('./Slide.js');

//===================================================================-Doubtitles
class Doubtitles {

  constructor (filename) {
    this.fileString = require('fs').readFileSync(filename, 'utf8');
    this.fileExt    = '.' + filename.split('.').slice(-1);

    const toSlides = require(`./${this.fileExt}ToSlides.js`);
    this.slides = toSlides(this.fileString);
  }
}

module.exports = Doubtitles;
