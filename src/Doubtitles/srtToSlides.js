const Slide = require('./Slide.js');

//'00:01:02,400' becomes 62.4
const timestampToSec = (stamp) => {

  const units = stamp
  .replace(',','')
  .split(':')
  .map((unit) => parseInt(unit)); // [hr, min, ms]

  let sum = (
    units[0] * 3600  +  // hr => ms
    units[1] * 60000 +  // min => ms
    units[2]            // ms
  ) / 1000;             // sum in ms => sum in seconds

  return sum;
};

const srtToSlides = (fileString) => {

  //Prepare lines of text
  let subs = fileString  // '<i>This</i> is a line of text,\n\n <b>dammit</b>'
  .replace('<b>',   '')  // '<i>This</i> is a line of text,\n\n dammit</b>'
  .replace('</b>',  '')  // '<i>This</i> is a line of text,\n\n dammit'
  .replace('<i>',   '')  // 'This</i> is a line of text,\n\n dammit'
  .replace('</i>',  '')  // 'This is a line of text,\n\n dammit'
  .split('\n')           //          ['This is a line of text,', '', ' dammit']
  .filter((line) => line !== '')  // ['This is a line of text,', ' dammit']
  .map   ((line) => line.trim()); // ['This is a line of text,', 'dammit']


  let text, startTime, endTime, prevSlide;
  let slides = [];

  // Start with an empty slide at 0...
  slides.push(new Slide('', 0));
  prevSlide = slides[0];
  // ...then, for each line of text...
  subs.forEach((line, lineIndex) => {

    // ...if you find a line with the stamp indicator...
    if (line.includes('-->')){

      // ...get and process the times from the line...
      startTime = timestampToSec(line.slice(0,12));
      endTime   = timestampToSec(line.slice(17,29));

      // ...get the text from the next line...
      text      = subs[lineIndex + 1];

      // ...finally, create the slide with all three fields...
      cSlide = new Slide(text, startTime, endTime);
      slides.push(cSlide);

      // ...plus an intermediate 'silence slide', if there's a large enough gap.
      let gap = startTime - prevSlide.endTime;
      if (gap > 1) {
        slides[slides.length - 1] = new Slide('', prevSlide.endTime + 0.001);
        slides.push(cSlide);
      }

      prevSlide = cSlide;
    }
  });

  //Sort all of the slides
  let byStartTime = (a,b) => a.startTime - b.startTime;
  slides.sort(byStartTime);

  return slides;
};

module.exports = srtToSlides;
