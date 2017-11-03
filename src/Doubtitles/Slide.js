//========================================================================-Slide
class Slide {
  constructor(text, startTime, endTime = startTime + 1) { //Pre: times are in ms
    this.text      = text; //plain text
    this.startTime = startTime;
    this.endTime   = endTime;
  }
}

module.exports = Slide;
