function parseSrt(filename){

  var fs = require('fs');

  var data = fs.readFileSync(filename, "utf8");

  // data.replace(/(\r\n|\n|\r)/gm,"*");

  data = data.replace("<b>", "").replace("<i>", "").replace("</b>", "").replace("</i>", "");

  var subs = data.split("\r\n");
  subs = subs.filter(function isNotAnEmptyString(value) { return value !== ""; });

  slides = new Map();

  slides.set(0, "");
  for (let i = 0; i < subs.length; i++){
    if (subs[i].includes("-->")){
      slides.set(srtToMilliseconds(subs[i].slice(0,12)), subs[i + 1]);
      slides.set(srtToMilliseconds(subs[i].slice(17)), "");
    }
  }
  slides.set(Number.MAX_SAFE_INTEGER, ""); //I forget why I needed this line

  function srtToMilliseconds(timeString){
    timeString = timeString.replace(',','');
    let splitTime = timeString.split(":");

    let ms = parseInt(splitTime[0]) * 3600000;
    ms += parseInt(splitTime[1]) * 60000;
    ms += parseInt(splitTime[2]);

    return ms;
  }

  return slides;

}

module.exports = parseSrt("Assets/Hanzawa Naoki - Ep 2.srt");
