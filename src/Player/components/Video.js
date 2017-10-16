// Factories whose return functions will be passed to various event listeners
const syncProgressBarToVideoFactory = require('../factories/syncProgressBarToVideo.js');

class Video {

  constructor(tags) {

    // TIMEUPDATE
    $(tags.videoTag).bind('timeupdate', syncProgressBarToVideoFactory(tags.videoTag, tags.progressTag));

  }
}

module.exports = Video;
