module.exports = (tags, services) => {
  const jVideo = $(tags.video);
  const misc = services.misc;

  const muteUnmute = () => {

    let currVol = jVideo.prop('volume');

    if (currVol > 0) {
      misc.preMuteVol = currVol;
      jVideo.prop('volume', 0);
    }
    else { jVideo.prop('volume', misc.preMuteVol); }

  };

  return muteUnmute;
};
