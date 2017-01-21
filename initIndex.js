var video = document.getElementById('video');
var progress = document.getElementById('progress-bar');
var handle = document.getElementById('progress-toki');

var myPlayer = {
  "isPlaying"   : function isPlaying() { return (video.currentTime > 0 &&
                                                !video.paused &&
                                                !video.ended &&
                                                video.readyState > 2); },
  "slides"      : require("./doubtitles.js"),
  "videoEl"     : video,
  "progressBar" : progress,
  "progressBarHandle" : handle
};

function createEventListeners(player) {

  let video         = player.videoEl;   //would currentTime work? Would it be confusing?
  let isPlaying     = player.isPlaying;
  let wasPlaying    = false;
  let slides        = player.slides;
  let slideMarks    = Array.from(slides.keys());
  let nextSlideNum  = 0;
  let progress      = player.progressBar;
  let toki          = player.progressBarHandle;
  let isUserDraggingProgressBar   = false;

  function playPause() {
    if (video.readyState > 2){
      if (video.paused || video.ended){
        video.play();
      }
      else {
        video.pause();
      }
    }
  }

  function findSlideNum(time) { //time is in milliseconds
    let low = 0, high = slideMarks.length - 2, average = Math.floor( (low + high) / 2 );

    while (low + 1 != high){ //binary search for greatest index where slideMarks[index] <= time
      if (slideMarks[average] < time){
        low = average;
        average = Math.floor((average + high) / 2);
      }
      else if (slideMarks[average] > time){
        high = average;
        average = Math.floor((low + average) / 2);
      }
      else { return average; }
    }
    if (slideMarks[average] <= time) { return low; }

    return high;
  }

  function videoOnTimeUpdate(e) {
    if (video.currentTime * 1000 >= slideMarks[nextSlideNum] && isPlaying()){
      // console.log(slideMarks[nextSlideNum] + ": " + slides.get(slideMarks[nextSlideNum]));
      nextSlideNum++;
    }
    progress.value = video.currentTime / video.duration;
    // console.log(progress.value);

    //Update handle position
    let handleLeft  = Math.round((progress.value * progress.offsetWidth) + progress.offsetLeft - (toki.offsetWidth / 2));
    toki.style.left = handleLeft.toString() + "px";
  }

  function videoOnClick(e) { playPause(); }

  function progressOnMouseMove(e) {
    let desiredProgress     = e.offsetX / progress.offsetWidth;
    let selectedTime        = Math.floor(desiredProgress * video.duration);
    let preceedingValidTime = slideMarks[findSlideNum(selectedTime)];
    let correctSlide        = slides.get(preceedingValidTime);

    // console.log(correctSlide);
  }

  function progressOnMouseDown(e)  {
    if   (video.paused) { wasPaused = true; }
    if (isPlaying){
      video.pause();
      isUserDraggingProgressBar = true;

      let desiredProgress = e.offsetX / progress.offsetWidth;
      video.currentTime = desiredProgress * video.duration;
      nextSlideNum = findSlideNum(video.currentTime) + 1;
    }
  }

  function progressOnMouseUp(e) {
    video.play();
    isUserDraggingProgressBar = false;
  }

  function docOnMouseUp(e) {
    if (isUserDraggingProgressBar) {
      progressOnMouseUp(e);
    }
  }

  function docOnMouseMove(e) {
    if (isUserDraggingProgressBar){
      console.log('Hello World!');
      let desiredProgress = e.offsetX / document.body.clientWidth;
      video.currentTime = desiredProgress * video.duration;
      nextSlideNum = findSlideNum(video.currentTime) + 1;
    }
  }

  return {
    "videoOnTimeUpdate"   : videoOnTimeUpdate,
    "videoOnClick"        : videoOnClick,
    "progressOnMouseMove" : progressOnMouseMove,
    "progressOnMouseDown" : progressOnMouseDown,
    "progressOnMouseUp"   : progressOnMouseUp,
    "docOnMouseMove"      : docOnMouseMove,
    "docOnMouseUp"        : docOnMouseUp
  };
}

var listeners = createEventListeners(myPlayer);

video.addEventListener    ('timeupdate', listeners.videoOnTimeUpdate);
video.addEventListener    ('click',      listeners.videoOnClick);
progress.addEventListener ('mousemove',  listeners.progressOnMouseMove);
progress.addEventListener ('mousedown',  listeners.progressOnMouseDown);
progress.addEventListener ('mouseup',    listeners.progressOnMouseUp);
document.addEventListener ('mouseup',    listeners.docOnMouseUp);
document.addEventListener ('mousemove',  listeners.docOnMouseMove);



/*====TODO
-Make progress draggable.
  -mousemove only gets called on stops, need another solution or an adjustment to this one
  -need to prevent focus events
-Figure out why replaying the video breaks the event listening.
-Remove script tag, and instead use on 'DOMContentLoaded' somehow?
-Prevent playing if video was paused before slider was moved, may have to do with the timeUpdate thing isPlaying thing
====*/
