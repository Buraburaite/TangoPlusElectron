const dotenv = require('dotenv');

//Creates Player object
var Player = require('./src/Player/Player.js');
// var myPlayer = new Player('../assets/Hanzawa Naoki - Ep 2.srt', document);
var myPlayer = new Player('./src/assets/diver.doub', document);
// var myPlayer = new Player('../assets/example.doub', document);
// var myPlayer = new Player('../assets/overlap-test.srt', document);




/*====TODO

-Make dragging the progress bar smooth.
---Right now, progressDown and progressMove seem to be working differently on slides and time updates. Probably don't even need progressMove, since we have docMove
-mousemove only gets called on stops, need another solution or an adjustment to this one
-Need to hide focus events
-Figure out why replaying the video breaks the event listening.
-Remove script tag, and instead use on 'DOMContentLoaded' somehow? Doesn't seem like a good idea.

====*/
