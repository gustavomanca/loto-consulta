'use strict';

// var concat = require('gulp-concat');
var gulp = require('gulp');
var sass = require('gulp-sass');

sass.compiler = require('node-sass');

gulp.task('workflow', done => {

  gulp
    .src('src/sass/index.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css/'));

  done();

});

gulp.task('default', function() {
  gulp.watch('src/sass/**/*.scss', gulp.series('workflow'));
});