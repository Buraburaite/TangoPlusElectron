# TangoPlusElectron: Video player for language learners
[![Travis](https://img.shields.io/travis/rust-lang/rust.svg?style=flat-square)](https://github.com/Buraburaite/TangoPlusElectron)

### Philosophy
Motivation is the only absolute requirement for learning. Therefore, students should be given as much freedom to explore as possible.

### Context
Language education nowadays does little to help students select their own learning materials. Trying to learn from the "source" (tv, music videos, movies, news, etc.) is very laborous, because subtitles may not be available in the original language. In addition, over time, looking up words in a dictionary constitutes a lot of unnecessary, repetitive work. This is especially true for pictographic languages like Japanese and Mandarin, where characters do not provide the pronunciation one would need to look them up in an online dictionary.

### Goals
This program is intended to make translating video easier for language learners who already have a good grasp of their target language's grammar, but need more practice to develop fluency. It makes defining words and providing pronunciations easy, and allows for your work to be saved so that it may be shared with others. The goal is to allow learners to choose their own materials, and to eliminate as much drudgery as possible so that they may focus on learning.

## Features
* Annotate lines of subtitles with definitions and pronunciations
* Save your work in a special file format
* Save your work with others
* Do all of this from one place: never need your browser!

## Installation
### From source
In your preferred working directory, get a copy of this repository:<br>
```
git clone https://github.com/Buraburaite/TangoPlusElectron
cd TangoPlusElectron
```
Install any dependencies (you will need to install NodeJS in order to run this command):<br>
```
npm install
```
Finally, run the testing server. This is will start the program, and will refresh the program everytime any of the files specified in the gulpfile.js are changed:<br><br>
```
npm start
```
<br>At this point, a video may play, but it also may not. If so, make sure to provide your own video (or use the one provided in the Assets folder, called Border-Collies.mp4), and link to it in the index.html's video source tag.
