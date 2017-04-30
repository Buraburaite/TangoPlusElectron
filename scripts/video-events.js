const jWin = $(window);
const jVideo = $(myPlayer.videoEl);

const scaleWithVWidth  = (jel) => jel.width ('100vw').height('auto');
const scaleWithVHeight = (jel) => jel.width('auto').height('100vh');

const setVidSize = () => {
  const winWidth = jWin.width();
  const winHeight = jWin.height();
  if (winWidth >  winHeight) { //if window is wide
    if (jVideo.width() > winWidth) {
      scaleWithVWidth(jVideo);
      console.log('here1');
    }
    else {
      scaleWithVHeight(jVideo);
      console.log('here2');
    }
  }
  else { //if window is tall or square
    scaleWithVWidth(jVideo);
    console.log('here3');
  }
};

let winTimer = setTimeout(setVidSize, 1000);


//We know window always starts off wide
jWin.resize((e) => {
  clearTimeout(winTimer);
  winTimer = setTimeout(setVidSize, 1000);
});


//window is wide and video fits:    scaleWithVHeight
//window is wide but video clipped: scaleWithVWidth
//window is tall and video fits:    scaleWithVWidth

//100vw & autoh => autow & autoh => autow & 100vh
