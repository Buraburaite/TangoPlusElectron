// muteUnmute is similiar to changeVolume(0), but it also remembers the volume
// from the last time it was muted. So, they're not really interchangable.
// Also, each factory may refer to only one value of preMuteVol, meaning
// that using the same factory repeatedly results in one remembered value...
// ...but, multiple factories (for instance, through importing), still
// result in multiple memories. The proper solution is a some kind of database,
// but currently it doesn't seem worth the added complexity because only
// one button does muteUnmute.

module.exports = (tags) => {
  const jSldr = $(tags.volumeSldr);
  // const jIcon = $(tags.muteBtn + ' i'); // the icon of the mute button

  let preMuteVol = 0.5;

  // change icon to match the volume passed to it
  // const adjustIconToMatch = (newVol) => {
  //   let iconClass = 'fa fa-vol-';
  //
  //   if      (newVol > 0.5) { iconClass += 'up'; }
  //   else if (newVol > 0)   { iconClass += 'down'; }
  //   else                { iconClass += 'off'; }
  //
  //   jIcon.attr('class', iconClass);
  // };

  const muteUnmute = () => {
    let currVol = jSldr.val();

    if (currVol > 0) { // if volume is greater than 0, mute
      preMuteVol = currVol;
      jSldr.val(0);
    } else {          // else, 'unmute'
      jSldr.val(preMuteVol);
    }

    jSldr.trigger('input'); // we need to trigger the event manually
  };

  return muteUnmute;
};
