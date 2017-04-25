const jWin = $(window);
const jVideo = $(myPlayer.videoEl);

jWin.resize((e) => {
  if (jWin.width() >  jWin.height()) {
    jVideo
    .width('auto')
    .height('100vh');
  } else {
    jVideo
    .width('100vw')
    .height('auto');
  }
});
