/*==NOTE==
Class structure: A Doubtitles has Slides, Slides have Words
Slides represent individual lines of subtitles. This includes time stamps, where
the 'words' are, definitions, and pronunciation. Much of the functionality of
this program is dependent upon slide objects, all of which are kept within their
corresponding Doubtitles object.

Conceptually, slides can be thought as a sequence of startTimes. That is, given
time t, the current slide is that which has the greatest startTime that is less
than or equal to t. 'Silence' is then represented by slides with empty strings.

startTime is key to understanding how subtitles are synchronized in this program.
For this reason, there is an redundant property that references startTime,
called mark, which more clearly emphasizes how slides do not "end", rather the
next one begins. However, startTime is maintained in order to have a clearer
conceptual opposite to endTime, which is useful when implementing features like
slides whose durations overlap.
====NOTE*/

//=========================================================================-Word
class Word {
  constructor(word, pronun, def) {
    this.word   = word;
    this.pronun = pronun;
    this.def    = def;
    this.id     = -1;
  }
}

//========================================================================-Slide
class Slide {
  constructor(text, startTime, endTime = startTime + 1) { //Pre: times are in ms
    this.text      = text; //plain text
    this.sequence  = []; //sequence of plain text and word objects
    this.startTime = startTime;
    this.endTime   = endTime;
  }
}

Object.defineProperty(Slide.prototype, 'mark', {
  get : function ()        { return this.startTime; },
  set : function (newTime) { this.startTime = newTime; }
});

//===================================================================-Doubtitles
class Doubtitles {

  constructor (filename) {

    this.nextWordId = 0; //id counter for word objects
    this.fileString = this._readFile(filename);
    this.fileExt    = '.' + filename.split('.').slice(-1);
    this.metadata   = this.fileExt === 'doub' ? this._parseMetadata() : this._defaultMetadata();
    this.slides     = this._parseSlides();
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

  _parseMetadata () { //need to test this

    //Extract the metadata into strings
    let lines =
    this.fileString
    .slice(data.indexOf('/*' + 2), data.indexOf('*/'))
    .replace('\r\n', '')
    .split(',');

    //Place key-value pairs into an object to return
    let metaObj = {}, keyValuePair = null;
    lines.forEach((line) => {
      keyValuePair = line.split(':');
      metaObj[keyValuePair[0].trim()] = keyValuePair[1].trim();
    });

    return metaObj;
  }

  _parseSlides () {

    //Prepare lines of text
    let subs = this.fileString
    .replace('<b>',   '')
    .replace('<i>',   '')
    .replace('</b>',  '')
    .replace('</i>',  '')
    .split('\n')
    .filter((line) => line !== '')
    .map   ((line) => line.trim());



    //Create slide objects with times and text (no definitions nor pronunciation yet)
    let text, startTime, endTime;
    let slides = [];
    slides.push(new Slide('', 0));
    subs.forEach((line, lineIndex) => {

      if (line.includes('-->')){

        text      = subs[lineIndex + 1];
        startTime = this._srtToMilliseconds(line.slice(0,12));
        endTime   = this._srtToMilliseconds(line.slice(17,29));

        slides.push(new Slide(text, startTime, endTime));
        slides.push(new Slide('', endTime + 1));
      }
    });
    slides.push(new Slide('', Number.MAX_SAFE_INTEGER - 1)); //Deprecate?



    //Sort all of the slides
    let byStartTime = (a,b) => a.startTime - b.startTime;
    slides.sort(byStartTime);



    //If file is a .doub file, interpret definitions and pronunciations
    if (this.fileExt === '.doub') {

      let segments, parts, firstPart, word, pronun, def, trailingText;
      slides.forEach((slide) => {

        if (slide.text !== '' && slide.text.includes('[')) {

          segments  = slide.text.split('[');
          firstPart = segments[0].includes(']') ? '' : segments[0];
          slide.sequence.push(firstPart);


          slide.text = firstPart;
          segments.forEach((segment) => {

            if (segment.includes(']')) {
              parts  = segment.split('|');
              word   = parts[0];
              pronun = parts[1] || null;
              def    = parts[2] ? parts[2].slice(0, parts[2].indexOf(']')) : null;
              let wordObj = new Word(word, pronun, def);
              wordObj.id = this.nextWordId++;
              slide.sequence.push(wordObj);


              trailingText = parts[parts.length - 1];
              trailingText = trailingText
              .slice(trailingText.indexOf(']') + 1, trailingText.length);

              slide.sequence.push(trailingText);

              slide.text += word + trailingText;

            }
          });

        }
      });
    }

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

      let sA = slides[i], sB = slides[i + 1];
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

    return slides;
  }

  _readFile (filename) { return require('fs').readFileSync(filename, 'utf8'); }

  //'00:01:02,400' becomes 62400
  _srtToMilliseconds (timeString) {

    const units = timeString.replace(',','').split(":");
    return (
      parseInt(units[0]) * 3600000 +
      parseInt(units[1]) * 60000 +
      parseInt(units[2])
    );
  }

  update(fieldId, newValue) {

  }
}


module.exports = Doubtitles;
