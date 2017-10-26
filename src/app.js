const Player = require('./Player/Player.js');
const player = new Player(
  {
    player: '#Player',
    skipRegion: '.skip',
    skipBack: '#skip-back',
    skipForward: '#skip-forward',
    slide: '#Slide',
    controls: '#Controls',
    progress: '#Progress',
    playPauseBtn: '#play-pause-btn',
    muteBtn: '#mute-btn',
    volumeSldr: '#volume-sldr',
    timeBtn: '#time-btn',
    cTime: '#current-time',
    duration: '#duration',
    autoReplayBtn: '#auto-replay-btn',
    loadBtn: '#load-btn',
    fullscreenBtn: '#fullscreen-btn',
    video: '#Video',
    videoContainer: '#video-container'
  }
);

$('#Video').attr('src', 'assets/diver.mp4');
