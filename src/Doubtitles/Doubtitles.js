const Slide = require('./Slide.js');

//===================================================================-Doubtitles
class Doubtitles {

  constructor (filename) {
    this.fileString = require('fs').readFileSync(filename, 'utf8');
    this.fileExt = '.' + filename.split('.').slice(-1);

    const toSlides = require(`./${this.fileExt}ToSlides.js`);
    this.slides = toSlides(this.fileString);
    this.cSlideIndex = 0;
  }

  getSlide(time) { //Pre: time is in seconds

    /*====
    if stillOnCSlide
      return cSlide
    elseif onNextSlide
      increment cSlide
      return cSlide
    else
      do binary search
    ====*/

    // We need the last slide this Doubtitles object returned,
    const cSlide = this.slides[this.cSlideIndex];

    // and the one after that,
    const nSlide = this.slides[this.cSlideIndex + 1];

    // and the one after that.
    const nnSlide = this.slides[this.cSlideIndex + 2];


    // If time is within the current slide, return the current slide...
    if (time > cSlide.startTime && time < nSlide.startTime) {
      return cSlide;
    }
    // Else if time is within the next slide, return the next slide
    else if (time > nSlide.startTime && time < nnSlide.startTime) {
      this.cSlideIndex++;
      return nSlide;
    }
    // Otherwise, just do a binary search
    else {
      this.cSlideIndex = this._binarySearchForSlideAt(time);
      return this.slides[this.cSlideIndex];
    }

  }

  _binarySearchForSlideIndexAt(time) { //Pre: time is in seconds
    let low = 0, high = slides.length - 2, average = Math.floor( (low + high) / 2 );

    while (low + 1 != high){

      if (slides[average].startTime < time){
        low = average;
        average = Math.floor((average + high) / 2);
      }
      else if (slides[average].startTime > time){
        high = average;
        average = Math.floor((low + average) / 2);
      }
      else {
        return average;
      }
    }

    if (slides[average].startTime <= time) {
      return low;
    }

    return high;
  }
}

module.exports = Doubtitles;
