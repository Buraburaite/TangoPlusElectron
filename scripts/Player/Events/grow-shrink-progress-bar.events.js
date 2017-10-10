const jProgress = $(myPlayer.progressEl);
const jHandle = myPlayer.jHandle;

const pDivHeight = $('#progress-div').height();

const growBar = () => {
  jProgress.height(pDivHeight / 1.5);
    jHandle
    .width(pDivHeight)
    .height(pDivHeight);
};
const shrinkBar = () => {
  jProgress.height(pDivHeight / 3);
    jHandle
    .width(pDivHeight / 1.5)
    .height(pDivHeight / 1.5);
};

jProgress.hover(growBar, shrinkBar);

shrinkBar();
