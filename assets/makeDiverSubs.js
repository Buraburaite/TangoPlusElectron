const fs = require('fs');
let nums = fs.readFileSync(__dirname + '/diver numbers.txt', 'utf-8');
nums = nums
.split('\r\n')
.map((n) => parseInt(n));

const lyrics =
["あの水平線が遠ざかっていく",
"青すぎた空には明日すら描けなくて",
"息もできないくらい澱んだ人の群れ",
"僕はいつからここに潜り込んだんだ？",
"悲しみなんて吐きだして前だけ見てればいいんだっけ",
"それじゃとてもまともでいられない",
"すべてを僕が敵にまわしても光をかすかに感じてるんだ",
"そこまで行けそうなら...",
"息をしたくてここは苦しくて",
"闇を見上げるだけの夜は浮かぶ減圧症のダイバー",
"生きているんだって確かめたくて",
"深い海底を目指してもう一度呼吸をしよう",
"頭の中の地図をひっくり返したら足りないものだらけで一人怯えたゆうべ",
"僕は強いんだってずっと思っていた誰よりも強いってずっと思っていた",
"迷子になった白鳥が星の夜空に浮かんでいた",
"慰めのように振りだした雨",
"だけどどうやら僕らはなれそうもない星が星なら僕は僕さ",
"どこまで行けそうかな",
"重たい碇を背負い込んでほんの少し祈りを描き足して",
"まるで合図のように振りだした雨",
"息をしたくてここは苦しくて",
"闇を見上げるだけの僕じゃ浮かぶ方法もないダイバー",
"生きているんだって確かめたいならそう",
"深い海底を目指してもう一度",
"息をしてみて",
"ただの幸せに気づいたらもう二度と溺れないよ"];

const leftPad = require('left-pad');

let newFileText =
nums.reduce((text, ms) => {
  let remainder = ms;
  remainder %= 3600000;
  let hours = ms - remainder;
  remainder %= 60000;
  let minutes = ms - hours - remainder;

  hours = leftPad(Math.floor(hours /3600000), 2, '0');
  minutes = leftPad(Math.floor(minutes /60000), 2, '0');
  remainder += '';

  return text + hours + ':' + minutes + ':' +
  remainder.slice(0,2) + ',' + leftPad(remainder.slice(2), 3, '0') + '\n';
}, '');

console.log(newFileText);

// nums = [str(i//2 + 1) + "\n" + nums[i] + " --> " + nums[i+1] + "\n" + lyrics[i//2] + "\n\n" for i in range(0, len(nums)) if i % 2 == 0]
// nums = "".join(nums)
//
// print(nums)
//
// with open("diver subs.srt", "w", encoding="utf-16") as f:
//     f.write(nums)
