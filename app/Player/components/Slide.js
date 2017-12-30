class Slide {

  constructor(tags, services) {

    // Save our connection to the application state
    this.doubsService = services.doubtitles;

    const jSlideText = $(tags.slideText);
    const videoEl = $(tags.video).get(0);

    const define = require('../functions/define.js');

    // #Video:TIMEUPDATE
    $(tags.video).bind(
      'timeupdate',
      () => {
        // if there's no doubtitles instance, do nothing...
        if (!this.doubs) { return; }
        // ...otherwise, update #Slide html contents to match the correct slide
        const text = this.doubs.getSlide(videoEl.currentTime).text;
        jSlideText.text(text);
      }
    );

    // #Slide:MOUSEDOWN
    $(tags.slide).mousedown(() => $(tags.video).get(0).pause());

    // #Slide:MOUSEUP
    $(tags.slide).mouseup(() => {

      // Get highlighted text, if there is any...
      const selection = window.getSelection();
      const word = selection.toString();

      if (word) {

        // ...then find the definition of the word...
        const def = define(word)
        .then((matchs) => {

          // ... if no definitions were found, let the user know...
          if (matchs.length === 0) {
            $(tags.definition).html('Nothing was found, try something else?');
          }
          // ...it definitions were found...
          else {
            // ...parse them into a human-readable string...
            matchs = matchs.reduce(
              (str, m) => str + `${m.kanji} (${m.kana}): ${m.def}<br>`,
              ''
            );
            // ...update the definition in the html...
            $(tags.definition).html(matchs);
          }

          // ...and show the definition to the user...
          $(tags.definition).show();
        })
        .catch((err) => {
          console.log(err);
        });
      }

      // ...finally, clear the selection for the user's convenience.
      selection.empty();
    });

    $(tags.definition).hide();
    $(tags.video).on('timeupdate', () => $(tags.definition).hide());
  }

  // getter used here to allow updates to flow from the service
  get doubs() { return this.doubsService.doubs; }
}

module.exports = Slide;
