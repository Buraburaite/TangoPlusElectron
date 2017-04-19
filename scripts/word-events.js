const slideDiv = $('#slide-div');

let selectedWord;
const doubs = myPlayer.slides;
console.log(doubs);

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
  .css('background-color', 'transparent')
  .css('border-color', 'transparent')
  .next('.tip-container')
  .hide(100);

  $(e.target)
  .css('background-color', 'white')
  .css('border-color', 'black');

  selectedWord = e.target;
});
