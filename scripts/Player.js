class Player {

  constructor (filename, doc) {

    this.document = doc;

    //Elements inside the player
    this.videoEl    = doc.getElementById('video'); //Video element;
    this.jDoubs     = $('#slide-div'); //doubtitles div;
    this.progressEl = doc.getElementById('progress-bar'); //Video progress element;
    this.jHandle    = $('#progress-handle'); //Progess bar handle;

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
      jHandle,
      jDoubs,
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
        // console.log(slides[nextSlideNum].sequence);
        updateSlide(slides[nextSlideNum]);
        nextSlideNum++;
      }

      //Syncs progress bar
      progressEl.value  = videoEl.currentTime / videoEl.duration;
      const handleLeft  = Math.round((progressEl.value * progressEl.offsetWidth) +
      progressEl.offsetLeft - (jHandle.outerWidth() / 2));
      jHandle.css("left", handleLeft.toString() + "px");
    }

    //=========================================================-Helper-Functions

    //Changes the contents of slideDiv to the provided slide
    const updateSlide = (slide) => {

      //First, empty slideDiv
      this.jDoubs.empty();

      //Save the slide -- this is used elsewhere but is important
      this.jDoubs.currentSlide = slide;

      //Then, for each part of the slide's sequence...
      slide.sequence.forEach((part) => {

        //...if it's a string, just add it inside a span
        if (typeof(part) === 'string') {
          this.jDoubs.append(`
            <span data-fieldId="T-69696969">${part}</span>`
          );
        } else {

          //...otherwise, it's a word object, which needs more stuff.
          //All word elements start with this html string
          let htmlString = `
          <span class="word-container">
          <span class="word">${part.word}</span>
          <div class="tip-container `;

          //Then, based on what kind of word object it is, add more html.
          //Note: fieldId denotes the kind of word object, and which word
          //object so that values can be updated correctly in the GUI
          if (part.def === '#name') {
            htmlString += `nameTip">
            <textarea class="nameArea" data-fieldId="N-${part.id}" rows="1">${part.pronun}</textarea>`;
          } else if (part.pronun === '#kana') {
            htmlString += `kanaTip">
            <textarea class="kanaArea" data-fieldId="K-${part.id}" rows="1">${part.def}</textarea>`;
          } else {
            htmlString += `
            fullTip">
            <textarea data-fieldId="D-${part.id}" class="defArea" rows="1">${part.def}</textarea>
            <textarea data-fieldId="P-${part.id}" class="pronunArea" rows="1">${part.pronun}</textarea>`;
          }

          //Finally, add the ending string...
          htmlString += `
          </div>
          </span>`;

          //...and add it to slideDiv.
          this.jDoubs.append(htmlString);
        }
      });
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

      if (slides[average].mark <= time) {
        return low;
      }

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


    //Store all the event functions in an object, for legibility.
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
