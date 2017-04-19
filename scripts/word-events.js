const slideDiv = $('#slide-div');

let selectedWord;

slideDiv.on('mouseover', '.word', (e) => {
  $(e.target)
  .next('.tip-container')
  .show(200);
});

slideDiv.on('mouseout', '.word', (e) => {

  const word = $(e.target);

  if (e.target !== selectedWord) {

    $(e.target)
    .next('.tip-container')
    .hide(100);
  }
});

slideDiv.on('click', '.word', (e) => {
  $(selectedWord)
  .next('.tip-container')
  .hide(100);
  selectedWord = e.target;
});
