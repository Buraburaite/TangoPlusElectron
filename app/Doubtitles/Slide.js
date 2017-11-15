//========================================================================-Slide
class Slide {
  constructor(text, startTime, endTime = startTime + 0.001) { //Pre: times are in ms
    this.text      = text;
    this.startTime = startTime;
    this.endTime   = endTime;
  }
}

module.exports = Slide;
