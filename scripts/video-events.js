const jWin = $(window);
const jVideo = $(myPlayer.videoEl);

const scaleWithVWidth  = (jel) => jel.width ('100vw').height('auto');
const scaleWithVHeight = (jel) => jel.width('auto').height('100vh');
const videoAspectRatio = () => jVideo.width() / jVideo.height();

//Strategy
//window is wide and video fits:    scaleWithVHeight
//window is wide but video clipped: scaleWithVWidth
//window is tall and video fits:    scaleWithVWidth
jWin.resize(() => {
  const winWidth = jWin.width();
  const winHeight = jWin.height();
  if (winWidth >  winHeight) { //if window is wide
    if (videoAspectRatio() * winHeight > winWidth) { //if video would be too wide to fit
      scaleWithVWidth(jVideo);
    }
    else {
      scaleWithVHeight(jVideo);
    }
  }
  else { //if window is tall or square
    scaleWithVWidth(jVideo);
  }
});
