const Player = require('./Player/Player.js');

// Services, or singleton classes that centralize and protect certain pieces
// of state in our application
const DoubtitlesService = require('./services/doubtitles.service.js');
// misc holds small bits of state until they find a better home
const MiscService = require('./services/misc.service.js');

const tags = {
  player: '#Player',
  instructions: '#instructions',
  flasher: '#flasher',
  slide: '#Slide',
  definition: '#definition',
  slideText: '#slide-text',
  controls: '#Controls',
  progress: '#Progress',
  playPauseBtn: '#play-pause-btn',
  muteBtn: '#mute-btn',
  volumeSldr: '#volume-sldr',
  timeBtn: '#time-btn',
  cTime: '#current-time',
  duration: '#duration',
  autoReplayBtn: '#auto-replay-btn',
  videoSourceBtn: '#video-source-btn',
  subsBtn: '#subs-btn',
  fullscreenBtn: '#fullscreen-btn',
  video: '#Video',
  videoContainer: '#video-container'
};

 const services = {
  doubtitles: new DoubtitlesService(tags),
  misc: new MiscService(tags)
};

// wire up UI components
const player = new Player(tags, services);

// add keyboard shortcuts
require('./keybindings.js')(tags, services);

// dev only
services.doubtitles.changeDoubs(__dirname + '/../IgnoreThis/hope.srt');
$('#Video').attr('src', '../IgnoreThis/hope.mp4');
