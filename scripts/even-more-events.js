const jProgress = $(myPlayer.progressEl);
const jHandle = myPlayer.jHandle;

const divHeight = $('#progress-div').height();

const growBar = () => {
  jProgress.height('100%');
    jHandle
    .width(divHeight)
    .height(divHeight);
};
const shrinkBar = () => {
  jProgress.height('50%');
    jHandle
    .width(divHeight / 1.5)
    .height(divHeight / 1.5);
};

jProgress.hover(growBar, shrinkBar);

shrinkBar();

//Known issue:
//The size of the handle is not relative, so at extreme window sizes
//it looks strange
