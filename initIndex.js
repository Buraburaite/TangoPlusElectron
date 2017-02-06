//Elements from index.html
var videoEl     = document.getElementById('video'); //Video element
var doubsEl     = document.getElementById('doubtitles'); //Smart subtitles div
var progressEl  = document.getElementById('progress-bar'); //Video progress element
var handleEl    = document.getElementById('progress-toki'); //Progess bar handle

//Creates Player object
var Player = require('./Player.js');
var myPlayer = new Player(
  'Assets/Hanzawa Naoki - Ep 2.srt',
  videoEl, doubsEl, progressEl, handleEl
);
