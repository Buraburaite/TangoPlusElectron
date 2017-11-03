const Slide = require('./Slide.js');

//===================================================================-Doubtitles
class Doubtitles {

  constructor (filename) {
    this.fileString = require('fs').readFileSync(filename, 'utf8');
    this.fileExt = filename.split('.').slice(-1);

    const toSlides = require(`./${this.fileExt}ToSlides.js`);
    this.slides = toSlides(this.fileString);
    this.cSlideIndex = 0;
  }

  getSlide(time) { // Pre: time is in seconds

    // We want the last slide this Doubtitles object returned,
    const cSlide = this.slides[this.cSlideIndex];

    // and the one after that,
    const nSlide = this.slides[this.cSlideIndex + 1];

    // and the one after that,
    const nnSlide = this.slides[this.cSlideIndex + 2];

    // and the one after that. (This is last one deals with silence slides)
    const nnnSlide = this.slides[this.cSlideIndex + 3];


    // If time is within the current slide, return the current slide...
    if (time > cSlide.startTime && time < nSlide.startTime) {
      return cSlide;
    }
    // ...else if time is within the next slide, return the next slide...
    else if (time > nSlide.startTime && time < nnSlide.startTime) {
      this.cSlideIndex++;
      return nSlide;
    }
    // ...else if time is within the next-next slide, return the next-next slide...
    else if (time > nnSlide.startTime && time < nnnSlide.startTime) {
      this.cSlideIndex += 2;
      return nnSlide;
    }
    // ...otherwise, just do a binary search for the correct slide.
    else {
      this.cSlideIndex = this._binarySearchForSlideIndexAt(time);
      return this.slides[this.cSlideIndex];
    }

  }

  _binarySearchForSlideIndexAt(time) { // Pre: time is in seconds
    let low = 0, high = this.slides.length - 2, average = Math.floor( (low + high) / 2 );

    while (low + 1 != high){

      if (this.slides[average].startTime < time){
        low = average;
        average = Math.floor((average + high) / 2);
      }
      else if (this.slides[average].startTime > time){
        high = average;
        average = Math.floor((low + average) / 2);
      }
      else {
        return average;
      }
    }

    if (this.slides[average].startTime <= time) {
      return low;
    }

    return high;
  }
}

module.exports = Doubtitles;
