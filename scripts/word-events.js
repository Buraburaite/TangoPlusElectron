const slideDiv = $('#slide-div');

slideDiv.on('mouseover', '.word', (e) => {
  console.log($(e.target)
  .next('.tip-container')
  .css('background-color', 'green'));
});
