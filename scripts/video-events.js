const jWin = $(window);
const jVideo = $(myPlayer.videoEl);

const scaleWithVWidth  = (jel) => jel.width ('100vw').height('auto');
const scaleWithVHeight = (jel) => jel.height('100vh').width('auto');

jWin.resize((e) => {
  const vwidth = jWin.width();
  // console.log(jVideo.width());
  if (vwidth >  jWin.height()) { //if window is wide
    if (jVideo.width() > vwidth) { //but video is too wide to fit
      scaleWithVWidth(jVideo); //scale to fit inside
      console.log('here1');
    }
    else {
      scaleWithVHeight(jVideo); //else, scale with the height
      console.log('here2');
    }
  }
  else { //if window is tall or square
    scaleWithVWidth(jVideo); //scale with the width
    console.log('here3');
  }
});


//window is wide and video fits: scaleWithVHeight
//window is wide but video clipped: scaleWithVWidth
//window is tall and video fits: scaleWithVWidth
