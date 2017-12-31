module.exports = (icon) => {
  const flasher = $(tags.flasher);
  const flasherIcon = $(tags.flasher + ' i');

  const flashIcon = () => {
    changeIcon();
    flash();
  };

  const changeIcon = require('./changeIcon.js')(flasherIcon, icon);
  const flash = () => {
    flasher.animate(
      { opacity: 0.5 },
      200,
      () => flasher.animate({ opacity: 0 }, 100)
    );
  };

  return flashIcon;
};
