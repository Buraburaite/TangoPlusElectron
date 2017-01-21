var slides = require('./doubtitles.js');
var marks =  Array.from(slides.keys());

function findSlide(time) { //time is in milliseconds
  var low = 0, high = marks.length - 1, average = Math.floor( (low + high) / 2 );

  while (low + 1 != high){
    if (marks[average] < time){
      low = average;
      average = Math.floor((average + high) / 2);
    }
    else{
      high = average;
      average = Math.floor((low + average) / 2);
    }
  }
  if (marks[average] <= time) { return low; }

  return high;
}

var result;

for (let i = 0; i < marks.length; i++){
  target = marks[i];
  result = marks[findSlide(target)];
  if (result < marks[i - 1] || result > marks[i + 1]) {
    console.log(i);
  }
}
