const slideDiv = $('#slide-div');

let selectedWord;
const { jDoubs } = myPlayer;

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

slideDiv.on('input', '.tip-container textarea', (e) => {
  const textAreaEl = $(e.target);
  textAreaEl.css('height', 'auto');
  textAreaEl.height(e.target.scrollHeight);
  //TODO: Textareas' width is based on the cols attribute. Very annoying
  //to change, would need custom behavior based on number of characters.
});

slideDiv.on('change', '.tip-container textarea', (e) => {

  const value = $(e.target).val();
});

console.log(jDoubs);
