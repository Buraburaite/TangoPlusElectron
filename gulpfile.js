'use strict';

var gulp = require('gulp');
var electron = require('electron-connect').server.create();

gulp.task('serve', function () {

  // // Start browser process
  electron.start();

  // // Restart browser process
  gulp.watch('main.js', electron.restart);

  // // Reload renderer process
  gulp.watch(['main.js', 'app.js', 'html/index.html', 'css/index.css',
              'js/Doubtitles.js', 'js/Player.js'], electron.reload);
});

gulp.task('reload:browser', function () {
  // Restart main process
  electron.restart();
});

gulp.task('reload:renderer', function () {
  // Reload renderer process
  electron.reload();
});

gulp.task('default', ['serve']);
