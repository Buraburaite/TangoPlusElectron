class Player {

  constructor (srtName, doc) {

    this.document = doc;

    //Elements inside the player
    this.videoEl    = doc.getElementById('video'); //Video element;
    this.doubsEl    = doc.getElementById('doubtitles'); //Smart subtitles div;
    this.progressEl = doc.getElementById('progress-bar'); //Video progress element;
    this.handleEl   = doc.getElementById('progress-toki'); //Progess bar handle;

    //Subtitles related
    let Doubtitles  = require('./Doubtitles.js');
    let doubs       = new Doubtitles(srtName);
    this.slides     = doubs.slides;
    this.slideMarks = doubs.slideMarks;

    this.attachListeners(this);
  }

  //=======================================================================-Init
  attachListeners(player){

    let listeners = this.playerEventListeners(player);

    player.videoEl.addEventListener    ('timeupdate', listeners.videoOnTimeUpdate);
    player.videoEl.addEventListener    ('click',      listeners.videoOnClick);
    player.progressEl.addEventListener ('mousemove',  listeners.progressOnMouseMove);
    player.progressEl.addEventListener ('mousedown',  listeners.progressOnMouseDown);
    player.progressEl.addEventListener ('mouseup',    listeners.progressOnMouseUp);
    player.document.addEventListener ('mouseup',    listeners.docOnMouseUp);
    player.document.addEventListener ('mousemove',  listeners.docOnMouseMove);
  }

  //Closure with relevant variables for the events
  playerEventListeners(player) {

    //Progress related
    let video         = player.videoEl;
    let progress      = player.progressEl;
    let toki          = player.handleEl;
    let wasPaused     = false;
    let isUserDraggingProgressBar   = false;

    //Subtitles related
    let doubsEl       = player.doubsEl;
    let slides        = player.slides;
    let slideMarks    = player.slideMarks;
    let nextSlideNum  = 0;


    //==========================================================-Document-Events
    function docOnMouseMove(e) {
      if (isUserDraggingProgressBar){
        console.log('Hello World!');
        let desiredProgress = e.offsetX / document.body.clientWidth;
        video.currentTime = desiredProgress * video.duration;
        nextSlideNum = findSlideNum(video.currentTime) + 1;
      }
    }

    function docOnMouseUp(e) {
      if (isUserDraggingProgressBar) {
        progressOnMouseUp(e);
      }
    }

    //======================================================-Progress-Bar-Events
    function progressOnMouseDown(e)  {
      if (video.paused) { wasPaused = true; }
      video.pause();
      isUserDraggingProgressBar = true;

      let desiredProgress = e.offsetX / progress.offsetWidth;
      video.currentTime = desiredProgress * video.duration;
      nextSlideNum = findSlideNum(video.currentTime) + 1;
    }

    function progressOnMouseMove(e) {
      let desiredProgress     = e.offsetX / progress.offsetWidth;
      let selectedTime        = Math.floor(desiredProgress * video.duration);
      let preceedingValidTime = slideMarks[findSlideNum(selectedTime)];
      let correctSlide        = slides.get(preceedingValidTime);

      // console.log(correctSlide);
    }

    function progressOnMouseUp(e) {
      if (!wasPaused) { video.play(); }
      wasPaused = false;
      isUserDraggingProgressBar = false;
    }

    //=====================================================-Video-Element-Events
    function videoOnClick(e) { playPause(); }

    function videoOnTimeUpdate(e) {
      //Syncs slides
      if (video.currentTime * 1000 >= slideMarks[nextSlideNum]){
        let text = slides.get(slideMarks[nextSlideNum]);
        console.log(text);
        // console.log(addWord(text, "What"));
        // doubsEl.innerHTML = addWord(text, "What");
        nextSlideNum++;
      }
      //Syncs progress bar
      progress.value  = video.currentTime / video.duration;
      let handleLeft  = Math.round((progress.value * progress.offsetWidth) +
      progress.offsetLeft - (toki.offsetWidth / 2));
      toki.style.left = handleLeft.toString() + "px";
    }

    //=========================================================-Helper-Functions

    //Creates a Word element for HTML injection
    function addWord(text, def) {
      let start = `
      <span class='word-container">
      <span class="word">`;
      let middle = `</span>
      <span class="tooltip" contenteditable="true">`;
      let end = `</span>
      </span>`;

      return start + text + middle + def + end;
    }

    /*===
    This performs a binary search for the greatest index of slideMarks,
    where slideMarks[index] <= time . This corresponds to the index of
    the slide that includes time. Use this to re-sync the subtitles whenever
    video progress changes arbitrarily (e.g. the user moves the progress bar).
    ====*/
    function findSlideNum(time) { //Precondition: time is in milliseconds
      let low = 0, high = slideMarks.length - 2, average = Math.floor( (low + high) / 2 );

      while (low + 1 != high){

        if (slideMarks[average] < time){
          low = average;
          average = Math.floor((average + high) / 2);
        }
        else if (slideMarks[average] > time){
          high = average;
          average = Math.floor((low + average) / 2);
        }
        else {
          return average;
        }
      }

      if (slideMarks[average] <= time) { return low; }

      return high;
    }

    //Bool: Is the video currently playing?
    function isPlaying() {
      return (video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2);
    }

    //Convenience function for playing and pausing the video
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


    //Listeners for attaching to relevant elements
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
}


module.exports = Player;

/*====TODO

-Make dragging the progress bar smootho.
---Right now, progressDown and progressMove seem to be working differently on slides and time updates. Probably don't even need progressMove, since we have docMove
-mousemove only gets called on stops, need another solution or an adjustment to this one
-Need to hide focus events
-Figure out why replaying the video breaks the event listening.
-Remove script tag, and instead use on 'DOMContentLoaded' somehow? Doesn't seem like a good idea.

====*/
