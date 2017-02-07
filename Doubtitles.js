
class Slide {
  constructor(text, startTime, endTime = startTime + 1) { //Pre: times are in milliseconds
    this.text      = text;
    this.startTime = startTime;
    this.endTime   = endTime;
  }

}

/*===
'Slide.mark' is another name for 'Slide.startTime'. Conceptually, slides can be
thought as a sequence of startTimes. For instance, if two slides overlap, that
is presented as three slides: Slide A -> Slide A & B -> Slide B. That is, the
overlap is considered its own slide, which simplifies overlapping slides into
a video display issue. Therefore, one should use Slide.mark over Slide.startTime,
unless you are specifically trying to differentiate the starting time from the
ending time, in which case you should use Slide.startTime in conjunction with
Slide.endTime, although functionally there is no difference.
===*/
Object.defineProperty(Slide.prototype, 'mark', {
  get: function()        { return this.startTime; },
  set: function(newTime) { this.startTime = newTime; }
});


class Doubtitles {

  constructor (srt) {

    this.slides = this.parseSrt(srt);
  }

  parseSrt(filename) {

    let fs = require('fs');
    let data = fs.readFileSync(filename, "utf8");

    // data.replace(/(\r\n|\n|\r)/gm,"*");

    data = data.replace("<b>", "").replace("<i>", "").replace("</b>", "").replace("</i>", "");

    let subs = data.split("\r\n");
    subs = subs.filter(function isNotAnEmptyString(value) { return value !== ""; });

    let slides = [];

    slides.push(new Slide('', 0));
    let text, startTime, endTime;
    for (let i = 0; i < subs.length; i++){
      if (subs[i].includes("-->")){
        text      = subs[i + 1];
        startTime = srtToMilliseconds(subs[i].slice(0,12));
        endTime   = srtToMilliseconds(subs[i].slice(17,29));
        slides.push(new Slide(text, startTime, endTime));
        slides.push(new Slide(text, endTime)); //TODO: soon to-be deprecated
      }
    }
    slides.push(new Slide('', Number.MAX_SAFE_INTEGER - 1)); //I forget why I needed this line

    function srtToMilliseconds(timeString){
      timeString = timeString.replace(',','');
      let splitTime = timeString.split(":");

      let ms = parseInt(splitTime[0]) * 3600000;
      ms += parseInt(splitTime[1]) * 60000;
      ms += parseInt(splitTime[2]);

      return ms;
    }

    slides.sort(function sortByStartTime(a,b) {
      return a.startTime - b.startTime;
    });
    return slides;

  }
}
// let d = new Doubtitles("Assets/Hanzawa Naoki - Ep 2.srt");
// console.log(new d.Slide('Hello World!'));


module.exports = Doubtitles;
