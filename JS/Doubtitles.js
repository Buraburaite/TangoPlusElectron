
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

  //'00:00:02,400' becomes 2400
  srtToMilliseconds(timeString){
    timeString = timeString.replace(',','');
    let splitTime = timeString.split(":");

    let ms = parseInt(splitTime[0]) * 3600000;
    ms += parseInt(splitTime[1]) * 60000;
    ms += parseInt(splitTime[2]);

    return ms;
  }

  parseSrt(filename) {

    //Read .srt file
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
        startTime = this.srtToMilliseconds(subs[i].slice(0,12));
        endTime   = this.srtToMilliseconds(subs[i].slice(17,29));
        slides.push(new Slide(text, startTime, endTime));
        slides.push(new Slide(text, endTime)); //TODO: soon to-be deprecated
      }
    }
    slides.push(new Slide('', Number.MAX_SAFE_INTEGER - 1)); //I forget why I needed this line

    //Sort all of the slides
    slides.sort(function sortByStartTime(a,b) {
      return a.startTime - b.startTime;
    });

    /*=================================================-OVERLAPPING-SLIDES-LOGIC

    //Note: Only works for up to two overlapping slides. Otherwise, there may be
    //      unexpected behaviors.
    //
    // Strategy: Add a new slide whose text is a concatenation of A and B with a
    //           delimiter. Its startTime = B.startTime + 1, so that it will
    //           hide B immediately while the video plays, and it will use the
    //           earliest endingTime from A and B. Then, if the endingTime of A
    //           and B are not equal, then add an additional slide with the
    //           logic below:
    //
    //           Example: A ends before B. In this case, the new slide's text is
    //           B's text, since B is now appropriate. This slide's startTime is
    //           A's endTime + 1, and its endTime is B's + 1.
    //
    //
    // 1000 -> 3000  CASE: A contains all of B, and then A continues
    // 1500 -> 2500  RESULT: 1000 -> 3000, 1500 -> 2500, 1501 -> 2500, 2501 -> 3001
    //                      |      A      |  B (hidden) |     A&B     |   A (new)  |
    //
    // 1000 -> 3000  CASE: A contains only some of B, so B continues
    // 1500 -> 4000  RESULT: 1000 -> 3000, 1500 -> 4000, 1501 -> 3000, 3001 -> 4001
    //                      |      A      |  B (hidden) |     A&B     |   B (new)  |
    //
    // 1000 -> 3000  CASE: A and B start simultaneously, and then B continues
    // 1000 -> 4000  RESULT: 1000 -> 3000, 1000 -> 4000, 1001 -> 3000, 3001 -> 4001
    //                      |      A      |  B (hidden) |     A&B     |   B (new)  |
    //
    // 1000 -> 3000  CASE: A contains all of B, and both stop simultaneously
    // 1500 -> 3000  RESULT: 1000 -> 3000, 1500 -> 3000, 1501 -> 3000
    //                      |      A      |  B (hidden) |     A&B    |
    //
    // 1000 -> 3000  CASE: A and B start and stop simultaneously
    // 1000 -> 3000  RESULT: 1000 -> 3000, 1000 -> 3000, 1001 -> 3000
    //                      |      A      |  B (hidden) |     A&B    |
    //
    ====*/
    let originalLength = slides.length;
    for (let i = 0; i < originalLength; i++) {

      let sA = slides[i];
      let sB = slides[i + 1];
      if (sA.endTime >= sB.startTime && ![sA.text, sB.text].includes('')) {

          let overlappingText = sA.text + '-%-' + sB.text;
          slides.push(new Slide(
            overlappingText,
            sB.startTime + 1,
            Math.min(sA.startTime, sB.startTime)
          ));

          if (sA.endingTime < sB.endingTime) {
            slides.push(new Slide(
              sB.text,
              sA.startTime + 1,
              sB.endTime + 1
            ));
          }
          else if (sA.endingTime > sB.endingTime) {
            slides.push(new Slide(
              sA.text,
              sB.startTime + 1,
              sA.endTime + 1
            ));
          }
        }
      }
      //Equals case not required.

      //Sort all of the slides (again)
      slides.sort(function sortByStartTime(a,b) {
        return a.startTime - b.startTime;
      });

      return slides;

    }
  }
  // let d = new Doubtitles("Assets/Hanzawa Naoki - Ep 2.srt");
  // console.log(new d.Slide('Hello World!'));


  module.exports = Doubtitles;
