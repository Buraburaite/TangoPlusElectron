const jWin = $(window);
const jVideo = $(myPlayer.videoEl);

const scaleWithVWidth  = (jel) => jel.width ('100vw').height('auto');
const scaleWithVHeight = (jel) => jel.width('auto').height('100vh');
const videoAspectRatio = () => jVideo.width() / jVideo.height();

//Strategy (keeping the aspect ratio the same)
//window is wide and video would fit entirely:    scaleWithVHeight
//window is wide but video would be clipped:      scaleWithVWidth
//window is tall and video would fit entirely:    scaleWithVWidth
//window is tall but video would be clipped:      scaleWithVHeight
//Note: this code /probably/ does not work with vertical videos yet
const resizeVideoToFitWindow = () => {
  const winWidth = jWin.width();
  const winHeight = jWin.height();
  if (winWidth >  winHeight && videoAspectRatio() * winHeight < winWidth) {
      scaleWithVHeight(jVideo);
    }
  else {
    scaleWithVWidth(jVideo);
  }

  shrinkBar();
};

jWin.resize(resizeVideoToFitWindow);
