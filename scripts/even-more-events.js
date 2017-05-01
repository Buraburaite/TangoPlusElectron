const jProgress = $(myPlayer.progressEl);
const jHandle = myPlayer.jHandle;

const divHeight = $('#progress-div').height();

const growHandle = () => {
  jHandle
  .width(divHeight)
  .height(divHeight);
};
const shrinkHandle = () => {
  jHandle
  .width(divHeight / 2)
  .height(divHeight / 2);
};

const growBar = () => {
  jProgress.height('100%');
  growHandle();
};
const shrinkBar = () => {
  jProgress.height('50%');
  shrinkHandle();
};

jProgress.hover(growBar, shrinkBar);
