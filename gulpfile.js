'use strict';

var gulp = require('gulp');
var electron = require('electron-connect').server.create({
  stopOnClose: true // stop electron server if last window is closed
});

gulp.task('serve', function () {

  // // Start browser process
  electron.start();

  // // Restart browser process
  gulp.watch('app/electron-start.js', electron.restart);

  // // Reload renderer process
  gulp.watch([
    'app/app.js',
    'app/**/*.js',
    'app/**/*.css',
    'app/**/*.html'
  ],
  electron.reload
);
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
