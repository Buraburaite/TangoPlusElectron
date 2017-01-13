fs = require('fs');

function parseFile(err, data){
  if (err) throw err;

  // data.replace(/(\r\n|\n|\r)/gm,"*");

  data = data.replace("<b>", "").replace("<i>", "").replace("</b>", "").replace("</i>", "");
  var subs = data.split("\r\n");

  subs = subs.filter(function isNotAnEmptyString(value) { return value !== ""; });

  slides = new Map();

  slides.set(0, "");
  for (let i = 0; i < subs.length; i++){
    if (subs[i].includes("-->")){
      slides.set(toMs(subs[i].slice(0,12)), subs[i + 1]);
      slides.set(toMs(subs[i].slice(17)), "");
    }
  }
  slides.set(Number.MAX_SAFE_INTEGER, ""); //I forget why I needed this line

  function toMs(timeString){
    timeString = timeString.replace(',','');
    let splitTime = timeString.split(":");

    let ms = parseInt(splitTime[0]) * 3600000;
    ms += parseInt(splitTime[1]) * 60000;
    ms += parseInt(splitTime[2]);

    return ms;
    }

  console.log(slides);


}

// void Doubtitles::loadSource(QString filename, int* mode)
// {

//     text.remove("<b>").remove("</b>").remove("<i>").remove("</i>");
//     QStringList subs = text.split("\n");
//     subs.removeAll("");    //there are variables to delete around here.
//     slides = QHash<int, QString>();
//     slides.insert(0, "");// make empty string
//     for (int i = 1; i < subs.size(); i++) {
//         if (subs.at(i).contains("-->")) {
//             slides.insert(toMs(subs.at(i).midRef(0,12)), subs[i + 1]);
//             slides.insert(toMs(subs.at(i).midRef(17,12)), "");
//         }
//     }
//     slides.insert(std::numeric_limits<int>::max(), "");
//
//     marks = slides.keys();
//     qSort(marks);
//     nextSlideNum = 0;
//     prevWord = new QString;
//     target = new QString;
//
// }
//
// int Doubtitles::toMs(const QStringRef r)
// {
//    QString s = r.toString();
//    s = s.remove(",");
//    QStringList l = s.split(":");
//
//    int p = l[0].toInt() * 3600000;
//    p += l[1].toInt() * 60000;
//    p += l[2].toInt();
//
//    return p - 500; //to better average starting point (positionChanged called apprx. once per second when playing)
// }


srt = fs.readFile("Assets/IgnoreThis/Hanzawa Naoki - Ep 2.srt", 'utf8', parseFile);
