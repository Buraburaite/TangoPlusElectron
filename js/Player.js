class Player {

  constructor (filename, doc) {

    //Elements inside the player
    this.videoEl    = $('#video'); //Video element;
    this.doubsEl    = $('.doubtitles'); //Smart subtitles div;
    this.progressEl = $('.progress-bar'); //Video progress element;
    this.handleEl   = $('.progress-toki'); //Progess bar handle;

    //Subtitles related
    const Doubtitles  = require('./Doubtitles.js');
    const doubs       = new Doubtitles(filename);
    this.slides     = doubs.slides;

    this._attachListeners();
  }

  //=======================================================================-Init
  _attachListeners(){

    const listeners = this._playerEventListeners();

    this.videoEl.on    ('timeupdate', listeners.videoOnTimeUpdate);
    this.videoEl.on    ('click',      listeners.videoOnClick);
    this.progressEl.on ('mousemove',  listeners.progressOnMouseMove);
    this.progressEl.on ('mousedown',  listeners.progressOnMouseDown);
    this.progressEl.on ('mouseup',    listeners.progressOnMouseUp);
    this.document.on   ('mouseup',    listeners.docOnMouseUp);
    this.document.on   ('mousemove',  listeners.docOnMouseMove);
  }

  //Closure with relevant variables for the events
  _playerEventListeners() {

    const {
      videoEl,
      progressEl,
      handleEl,
      doubsEl,
      slides
    } = this;

    //Progress related
    let wasPaused     = false;
    let isUserDraggingProgressBar = false;

    //Subtitles related
    let nextSlideNum  = 0;


    //==========================================================-Document-Events
    function docOnMouseMove(e) {
      if (isUserDraggingProgressBar){
        // console.log('Hello World!');
        let desiredProgress = e.offsetX / document.body.clientWidth;
        videoEl.currentTime = desiredProgress * videoEl.duration;
        nextSlideNum = findSlideNum(videoEl.currentTime) + 1;
      }
    }

    function docOnMouseUp(e) {
      if (isUserDraggingProgressBar) {
        progressOnMouseUp(e);
      }
    }

    //======================================================-Progress-Bar-Events
    function progressOnMouseDown(e)  {
      if (videoEl.paused) { wasPaused = true; }
      videoEl.pause();
      isUserDraggingProgressBar = true;

      let desiredProgress = e.offsetX / progressEl.offsetWidth;
      videoEl.currentTime = desiredProgress * videoEl.duration;
      nextSlideNum = findSlideNum(videoEl.currentTime) + 1;
    }

    function progressOnMouseMove(e) {
      let desiredProgress = e.offsetX / progressEl.offsetWidth;
      let selectedTime    = Math.floor(desiredProgress * videoEl.duration);
      let correctSlide    = slides[findSlideNum(selectedTime)];

      // console.log(correctSlide);
    }

    function progressOnMouseUp(e) {
      if (!wasPaused) { videoEl.play(); }
      wasPaused = false;
      isUserDraggingProgressBar = false;
    }

    //=====================================================-Video-Element-Events
    function videoOnClick(e) { playPause(); }

    function videoOnTimeUpdate(e) {
      //Syncs slides
      while (videoEl.currentTime * 1000 >= slides[nextSlideNum].mark){
        let text = slides[nextSlideNum].text;
        console.log(text);
        // console.log(addWord(text, "What"));
        // doubsEl.innerHTML = addWord(text, "What");
        nextSlideNum++;
      }

      //Syncs progress bar
      console.log(videoEl);
      progressEl.value  = videoEl.currentTime / videoEl.duration;
      let handleLeft  = Math.round((progressEl.value * progressEl.offsetWidth) +
      progressEl.offsetLeft - (handleEl.offsetWidth / 2));
      handleEl.style.left = handleLeft.toString() + "px";
    }

    //=========================================================-Helper-Functions

    //Creates a Word element for HTML injection
    function addWord(text, def) {

      /*====
      span containing spans
      ====*/
      // const doub
      let start = `
      <span class="word-container">
      <span class="word">`;
      let middle = `</span>
      <span class="tooltip" contenteditable="true">`;
      let end = `</span>
      </span>`;

      return start + text + middle + def + end;
    }

    /*===
    This performs a binary search for the greatest index of slides,
    where slides[index].mark <= time . This corresponds to the index of
    the slide that includes time. Use this to re-sync the subtitles whenever
    video progress changes arbitrarily (e.g. the user moves the progress bar).
    ====*/
    function findSlideNum(time) { //Pre: time is in milliseconds
      let low = 0, high = slides.length - 2, average = Math.floor( (low + high) / 2 );

      while (low + 1 != high){

        if (slides[average].mark < time){
          low = average;
          average = Math.floor((average + high) / 2);
        }
        else if (slides[average].mark > time){
          high = average;
          average = Math.floor((low + average) / 2);
        }
        else {
          return average;
        }
      }

      if (slides[average].mark <= time) { return low; }

      return high;
    }

    //Bool: Is the video currently playing?
    function isPlaying() {
      return (videoEl.currentTime > 0 && !videoEl.paused && !videoEl.ended && videoEl.readyState > 2);
    }

    //Convenience function for playing and pausing the video
    function playPause() {
      if (videoEl.readyState > 2){
        if (videoEl.paused || videoEl.ended){
          videoEl.play();
        }
        else {
          videoEl.pause();
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
