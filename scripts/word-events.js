const slideDiv = $('#slide-div');



slideDiv.on('mouseover', '.word', (e) => {
  $(e.target)
  .next('.tip-container')
  .show(200);
});

slideDiv.on('mouseout', '.word', (e) => {
  $(e.target)
  .next('.tip-container')
  .hide(100);
});
