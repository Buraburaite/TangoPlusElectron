class Player {

  constructor (filename, doc) {

    this.document = doc;

    //Elements inside the player
    this.videoEl    = doc.getElementById('video'); //Video element;
    this.doubsEl    = doc.getElementById('slide-div'); //Smart subtitles div;
    this.progressEl = doc.getElementById('progress-bar'); //Video progress element;
    this.handleEl   = doc.getElementById('progress-toki'); //Progess bar handle;

    //Subtitles related
    const Doubtitles  = require('./Doubtitles.js');
    const doubs       = new Doubtitles(filename);
    this.slides     = doubs.slides;

    this._attachListeners();
  }

  //=======================================================================-Init
  _attachListeners(){

    const listeners = this._playerEventListeners();

    this.videoEl   .addEventListener ('timeupdate', listeners.videoOnTimeUpdate);
    this.videoEl   .addEventListener ('click',      listeners.videoOnClick);
    this.progressEl.addEventListener ('mousemove',  listeners.progressOnMouseMove);
    this.progressEl.addEventListener ('mousedown',  listeners.progressOnMouseDown);
    this.progressEl.addEventListener ('mouseup',    listeners.progressOnMouseUp);
    this.document  .addEventListener ('mouseup',    listeners.docOnMouseUp);
    this.document  .addEventListener ('mousemove',  listeners.docOnMouseMove);
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

    //use jQuery to make changing the contents of doubsEl easier
    const jDoubs = $(doubsEl);

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
        // console.log(slides[nextSlideNum].sequence);
        jDoubs.empty();
        jDoubs.append(htmlify(slides[nextSlideNum].sequence));
        nextSlideNum++;
      }

      //Syncs progress bar
      progressEl.value  = videoEl.currentTime / videoEl.duration;
      const handleLeft  = Math.round((progressEl.value * progressEl.offsetWidth) +
      progressEl.offsetLeft - (handleEl.offsetWidth / 2));
      handleEl.style.left = handleLeft.toString() + "px";
    }

    //=========================================================-Helper-Functions

    const htmlify = (sequence) => {
      let htmlString = ``;
      sequence.forEach((part) => {
        if (typeof(part) === 'string') {
          htmlString += `
          <span>${part}</span>`;
        } else {
          htmlString += `
          <span class="word-container">
          <span class="word">${part.word}</span>
          <div class="tip-container `;


          if (part.def === '#name') {
            htmlString += `nameTip">
            <textarea>${part.pronun}</textarea>`;
          } else if (part.pronun === '#kana') {
            htmlString += `kanaTip">
            <textarea>${part.def}</textarea>`;
          } else {
            htmlString += `
            fullTip">
            <textarea class="defTip">${part.def}</textarea>
            <textarea class="pronunTip">${part.pronun}</textarea>`;
          }

          htmlString += `
          </div>
          </span>`;
        }
      });

      return htmlString;
    };

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

          //Remove 'fake-focus' from the selected word element
          $(selectedWord)
          .css('background-color', 'transparent')
          .css('border-color', 'transparent')
          .next('.tip-container')
          .hide(100);
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
