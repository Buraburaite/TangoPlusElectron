const slideDiv = $('#slide-div');

let selectedWord;
const { jDoubs } = myPlayer;

slideDiv.on('mouseover', '.word', (e) => {

  const jWord = $(e.target);

  jWord
  .css('background-color', 'white')
  .next('.tip-container')
  .show(200);
});

slideDiv.on('mouseout', '.word', (e) => {

  const jWord = $(e.target);

  if (e.target !== selectedWord) {

    jWord
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

const resizeTextarea = (el) => {
  const jEl = $(el);
  jEl.css('height', 'auto');
  jEl.height(el.scrollHeight);
};


slideDiv.on('input', '.tip-container textarea', (e) => {
  resizeTextarea(e.target);
  //TODO: Textareas' width is based on the cols attribute. Very annoying
  //to change, would need custom behavior based on number of characters.
});

slideDiv.on('change', '.tip-container textarea', (e) => {

  const jWord = $(e.target);

  //fieldId is a two-part id. The first part is the field type
  //(kana, name, pronun, or def), and the second part is the wordId,
  //which is used to find the word object in the current slide that
  //the field corresponds to.
  const fieldId = $(e.target).attr('data-fieldId').split('-');
  const type = fieldId[0];
  console.log(fieldId[1]);
  const word =
  jDoubs.currentSlide.sequence
  .find((word) => word.id === parseInt(fieldId[1]));

  if ('NKDP'.includes(type)) {
    if ('KD'.includes(type)) { word.def    = jWord.val(); }
    else                     { word.pronun = jWord.val(); }
  }
  else {
    console.log('ERROR: fieldId\'s type is not valid');
  }
});
