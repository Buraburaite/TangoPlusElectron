const jWin = $(window);
const jVideo = $(myPlayer.videoEl);

jWin.resize((e) => {
  if (jWin.width() >  jWin.height()) {
    jVideo
    .width('auto')
    .height('92vh');
  } else {
    jVideo
    .width('92vw')
    .height('auto');
  }
});
