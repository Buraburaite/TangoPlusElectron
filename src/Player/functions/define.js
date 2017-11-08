const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./src/vendor/JMdict.db');

module.exports = (word) => {

  const lookupWord = new Promise((resolve, reject) => {

    matchs = [];

    db.each(
      'SELECT id, kanji, kana FROM jisho WHERE kanji = ?',
      word,
      (err, row) => { // foreach callback (this happens after all results are found)

        if (err) { reject(err); return; }

        console.log('found something');

        matchs.push(row);
      },
      (err, rowCount) => { // completion callback

        if (err) { reject(err); return; }

        console.log(rowCount, matchs);

        db.close();

        resolve(matchs);
      }
    );
  });

  return lookupWord;
};
