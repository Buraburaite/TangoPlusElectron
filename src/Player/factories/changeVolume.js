module.exports = (tags, isEventDriven = false) => {
  const jVideo = $(tags.video);
  const jIcon = $(tags.muteBtn + ' i');

  const changeVolume = (param) => {

    let newVol = param;
    if (isEventDriven) { newVol = param.target.value; }

    // 1) update video's volume
    jVideo.prop('volume', newVol);

    // 2) update mute button's icon
    // (there are unique icons for 0, <= 0.5, and > 0.5);
    let iconClass = 'fa fa-volume-';

    if      (newVol > 0.5) { iconClass += 'up'; }
    else if (newVol > 0)   { iconClass += 'down'; }
    else                   { iconClass += 'off'; }

    jIcon.attr('class', iconClass);
  };

  return changeVolume;
};
