var player = {
  videoEl : document.getElementById('video') //works
};

var doubs = require("./doubtitles.js");
for (var varName in doubs) {
  player[varName] = doubs[varName]; //works
}

function onTimeUpdate(player, video) {
  console.log("here"); //only gets called once! What gives?!
  if (video.currentTime >= player.slideMarks[player.nextSlideNum] && player.isPlaying){
    console.log(player.slides[video.nextSlideNum]);
    player.nextSlideNum++;
  }
}

function onPlaying(player) {
  player.isPlaying = true;
}

function onPause(player) {
  player.isPlaying = false;
}

function onEnded(player) {
  player.isPlaying = false;
}

player.videoEl.addEventListener('timeupdate', onTimeUpdate(player, player.videoEl));
