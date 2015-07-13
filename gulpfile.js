var gulp = require('gulp');

var autoprefixer = require('gulp-autoprefixer');
var babelify = require('babelify');
var browserify = require('browserify');
var connectLivereload = require('connect-livereload');
var del = require('del');
var express = require('express');
var less = require('gulp-less');
var livereload = require('gulp-livereload');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var source = require('vinyl-source-stream');



/*
 * CONSTANTS
 */
var SERVER_PORT = 3001;
var LIVERELOAD_PORT = 35729;
var BUILD_PATH = './build';
var err = function(err) {
  console.log(err);
  console.log(err.stack);
};



/*
 * DEV SERVER
 */
var server = express();
server.use(connectLivereload({
  port: LIVERELOAD_PORT
}));
server.use(express.static(BUILD_PATH));

gulp.task('serve', function() {
  server.listen(SERVER_PORT);
  livereload.listen(LIVERELOAD_PORT);
});



/*
 * BUILD TASKS
 */
gulp.task('build', ['build-html', 'build-js', 'build-less']);

gulp.task('clean', function(cb) {
  del(['build/**'], cb);
});

gulp.task('build-html', function() {
  return gulp.src('./src/index.html')
    .pipe(gulp.dest(BUILD_PATH))
    .pipe(livereload());
});

gulp.task('build-js', function (){
  var bundler = browserify({
    entries: ['./src/js/app.js'],
    debug: true
  });

  return bundler
    .transform(babelify)
    .bundle()
    .on('error', err)
    .pipe(plumber(err))
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(BUILD_PATH))
    .pipe(livereload());
});

gulp.task('build-less', function() {
  return gulp.src('./src/less/app.less')
    .pipe(plumber(err))
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(rename('bundle.css'))
    .pipe(gulp.dest(BUILD_PATH))
    .pipe(livereload());
});



/*
 * WATCH TASKS
 */
gulp.task('watch', [
  'build-js', 'build-less', 'build-html',
  'watch-js', 'watch-less', 'watch-html',
  'serve'
]);

gulp.task('watch-js', function() {
  gulp.watch(['./src/js/**'], ['build-js']);
});

gulp.task('watch-less', function() {
  gulp.watch(['./src/less/**'], ['build-less']);
});

gulp.task('watch-html', function() {
  gulp.watch(['./src/*.html'], ['build-html']);
});
