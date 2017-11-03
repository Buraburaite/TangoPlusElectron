//'00:01:02,400' becomes 62.4
const timestampToSec = (stamp) => {

  const units = stamp
  .replace(',','')
  .split(':')
  .map((unit) => parseInt(unit));

  return (
    units[0] * 3600 +
    units[1] * 60   +
    units[2]
  );
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


  let text, startTime, endTime;
  let slides = [];

  // Start with an empty slide at 0...
  slides.push(new Slide('', 0));
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
      slides.push(new Slide(text, startTime, endTime));
      // ...plus an intermediate 'silence slide'.
      slides.push(new Slide('', endTime + 1));
    }
  });

  //Sort all of the slides
  let byStartTime = (a,b) => a.startTime - b.startTime;
  slides.sort(byStartTime);

  return slides;
};

module.exports = srtToSlides;
