const sqlite3 = require('sqlite3').verbose();

module.exports = (word) => {

  const db = new sqlite3.Database('./src/vendor/JMdict/JMdict.db');

  const lookupWord = new Promise((resolve, reject) => {

    matchs = [];

    db.each(
      'SELECT * FROM jisho WHERE kanji = ?',
      word,
      (err, row) => { // foreach callback (this happens after all results are found)

        if (err) { reject(err); return; }

        matchs.push(row);
      },
      (err, rowCount) => { // completion callback

        if (err) { reject(err); return; }

        db.close();

        resolve(matchs);
      }
    );
  });

  return lookupWord;
};
