module.exports = (jIcon, newIcon) => {

  const changeIcon = () => {
    jIcon.
    removeClass()
    .addClass('fa fa-' + newIcon);
  };

  return changeIcon;
};
