var gulp = require('gulp');
var sass = require('gulp-sass');
var mainBowerFiles = require('main-bower-files');
var nodemon = require('nodemon');

var SASS_SRC = './views/**/*.scss';
var JADE_SRC = './views/**/*.jade';
var BOWER_SRC = './bower_components/**/*.*';

gulp.task('sass', function () {
  gulp.src(SASS_SRC)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('main-bower-files', function() {
    return gulp.src(mainBowerFiles())
        .pipe(gulp.dest('./public/js/third-party'));
});


gulp.task('watch:scss', function () {
  gulp.watch(SASS_SRC, ['sass']);
});

gulp.task('watch:bower', function () {
  gulp.watch(BOWER_SRC, ['main-bower-files']);
});

gulp.task('start', function () {
  nodemon({
    script: './bin/www',
    ext: 'js html',
    env: { 'NODE_ENV': 'development' }
  });
});

gulp.task('bower', ['main-bower-files']);

gulp.task('default', ['sass', 'bower', 'watch:bower', 'watch:scss', 'start']);
