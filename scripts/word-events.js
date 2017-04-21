const slideDiv = $('#slide-div');

let selectedWord;
const doubs = myPlayer.slides;

slideDiv.on('mouseover', '.word', (e) => {

  const word = $(e.target);

  word
  .css('background-color', 'white')
  .next('.tip-container')
  .show(200);
});

slideDiv.on('mouseout', '.word', (e) => {

  const word = $(e.target);

  if (e.target !== selectedWord) {

    word
    .css('background-color', 'transparent')
    .next('.tip-container')
    .hide(100);
  }
});

slideDiv.on('click', '.word', (e) => {

  myPlayer.videoEl.pause();

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

slideDiv.on('change', '.tip-container input', (e) => {

  const value = $(e.target).val();

  console.log(value);


});
