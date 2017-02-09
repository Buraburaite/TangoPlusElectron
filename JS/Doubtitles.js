//========================================================================-Slide
/*==NOTE==
Slides represent individual lines of subtitles. This includes time stamps, where
the 'words' are, definitions, and pronunciation. Much of the functionality of
this program is dependent upon slide objects, all of which are kept within their
corresponding Doubtitles object.

Conceptually, slides can be thought as a sequence of startTimes. That is, given
time t, the current slide is that which has the greatest startTime that is less
than or equal to t. 'Silence' is then represented by slides with empty strings.

startTime is key to understanding how subtitles are synchronized in this program.
For this reason, there is an redundant property that references startTime,
called mark, which more clearly emphasizes how slides do not end, only the next
one starts. However, startTime is maintained in order to have a clearer
conceptual opposite to endTime, which is useful when implementing features like
slides whose durations overlap.
====NOTE*/

class Slide {
  constructor(text, startTime, endTime = startTime + 1) { //Pre: times are in ms
    this.text      = text;
    this.words     = [];
    this.startTime = startTime;
    this.endTime   = endTime;
  }
}

Object.defineProperty(Slide.prototype, 'mark', {
  get: function()        { return this.startTime; },
  set: function(newTime) { this.startTime = newTime; }
});


//===================================================================-Doubtitles

class Doubtitles {

  constructor (filename) {

    this.fileString = this._readFile(filename);
    this.fileExt    = filename.slice('.')[-1];
    this.metadata   = this.fileExt === 'doub' ? this._readMetadata() : this._defaultMetadata();
    this.slides     = this._readSlides();
  }

  _defaultMetadata () {

    return {
      lexicographer  : "Javier Cueto",
      lastUpdated    : new Date(2016,1,8),
      defBrackets    : '[]',
      defDelimiter   : '|',
      doubSourceUrl  : 'https://www.google.com',
      srtFilename    : 'Hanzawa Naoki - Ep 2.srt',
      srtSourceUrl   : 'https://www.google.com',
      mediaFilename  : '2-2.mp4',
      mediaSourceUrl : 'https://www.google.com'
    };
  }

  _readFile (filename) {

    let fs = require('fs'); //should this be global?
    return fs.readFileSync(filename, "utf8");
  }

  _readMetadata () {

    //Extract the metadata into strings
    let data = this.fileString.replace('\r\n', '');
    data = data.slice(data.indexOf('/*'), data.indexOf('*/'));
    let lines = data.split(',');

    //Place key-value pairs into an object to return
    metaObj = {};
    lines.forEach( function (line) {
      let keyValuePair = line.split(': ');
      metaObj[keyValuePair[0]] = keyValuePair[1];
    });

    return metaObj;
  }

  _readSlides () {

    let data = this.fileString;

    // data.replace(/(\r\n|\n|\r)/gm,"*"); Doesn't work for some reason...?

    data = data.replace("<b>", "").replace("<i>", "").replace("</b>", "").replace("</i>", "");

    let subs = data.split("\r\n");
    subs = subs.filter(function isNotAnEmptyString(value) { return value !== ""; });
    //pretty sure I don't want this filter line

    let slides = [];
    slides.push(new Slide('', 0));
    let text, startTime, endTime;
    for (let i = 0; i < subs.length; i++){
      if (subs[i].includes("-->")){
        text      = subs[i + 1];
        startTime = this._srtToMilliseconds(subs[i].slice(0,12));
        endTime   = this._srtToMilliseconds(subs[i].slice(17,29));
        slides.push(new Slide(text, startTime, endTime));
        slides.push(new Slide('', endTime + 1)); //TODO: soon to-be deprecated
      }
    }
    slides.push(new Slide('', Number.MAX_SAFE_INTEGER - 1)); //Deprecate?

    //Sort all of the slide
    let byStartTime = (a,b) => a.startTime - b.startTime;
    slides.sort(byStartTime);


    /*OVERLAPPING-SLIDES-LOGIC

    //NOTE: Only works for up to two overlapping slides. Otherwise, there may be
    //      unexpected behavior.
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
        //Equals case not required.
      }
    }


    //Sort all of the slides (again)
    slides.sort(byStartTime);

    //If file is a .doub file, interpret definitions and pronunciations
    if (this.fileExt === '.doub') { //No no no no no, bad Javi! This is not what words mean!
      let text, segments, parts, word, pronun, def;

      for (let i = 0; i < slides.length; i++) {
        text     = slides[i].text;
        segments = text.split('[');

        for (let j = 0; j < segments.length; j++) {
          parts = segments.split('|'); //Makes this do words, dammit
          slides[i].text   = parts[0]; //need to remove trailing bracket
          slides[i].pronun = parts[1] || parts[2] || null;
          slides[i].def    = parts[2] || null;
        }
        //get text without extra data in it
      }
    }

    // function saveParts(seg) {
    //
    //   parts = seg.split('|');
    //   slides[i].text   = parts[0];
    //   slides[i].pronun = parts[1] || null;
    //   slides[i].def    = parts[2] || null;
    // }

    function toPlainText(str) {

      let plainText = '';
      for (let i = 0; i < str.length; i++) {

        if (str[i] === '[') {
          while (str[i] != '|') {
            i++;
            plainText += str[i];
          }
        }
        plainText += str[i];

      }

      return plainText;
    }

    return slides;
  }

  //'00:01:02,400' becomes 62400
  _srtToMilliseconds (timeString){
    timeString = timeString.replace(',','');
    let units = timeString.split(":");

    let ms = 0;
    ms += parseInt(units[0]) * 3600000;
    ms += parseInt(units[1]) * 60000;
    ms += parseInt(units[2]);

    return ms;
  }
}


module.exports = Doubtitles;
