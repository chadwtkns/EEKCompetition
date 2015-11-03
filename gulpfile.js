// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var gutil = require('gulp-util');
var jsonminify = require('gulp-jsonminify');
var minifyHTML = require('gulp-minify-html');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var notify = require('gulp-notify');
var sass = require('gulp-ruby-sass');
var order = require('gulp-order');
var strip = require('gulp-strip-comments');
var htmlclean = require('gulp-htmlclean');
var ngAnnotate = require('gulp-ng-annotate');

// ruby sass
gulp.task('sass', function() {
   return sass('src/scss/', {"noCache":true})
     .on('error', function (err) {
       console.error('Error!', err.message);
     })
     .pipe(autoprefixer({ browsers: ['last 3 versions'], cascade: false }))
     .pipe(order([
         "all.css",
         "medium.css",
         "large.css"
     ]))
     .pipe(concat('style.min.css'))
     .pipe(minifyCSS())
     .pipe(gulp.dest('www/css'));
});

// Minify HTML
gulp.task('min-html', function() {
    var opts = {
        empty: true,
        cdata: true,
        comments: false,
        conditionals: true,
        spare: true,
        quotes: true,
        loose: false
    };
    gulp.src('src/*.html')
        .pipe(minifyHTML(opts))
        .pipe(gulp.dest('www'));
    gulp.src('src/partials/**/*.html')
        .pipe(minifyHTML(opts))
        .pipe(gulp.dest('www/partials'));
    gulp.src('src/templates/*.html')
        .pipe(minifyHTML(opts))
        .pipe(gulp.dest('www/templates'));
});

// Minify JSON
gulp.task('min-json', function () {
    return gulp.src('json/**/*.json')
        .pipe(jsonminify())
        .pipe(gulp.dest('www/json'));
});

// Prefix & Minify CSS
gulp.task('min-css', ['sass'], function() {
    return gulp.src('css/*.css')
        .pipe(autoprefixer({ browsers: ['last 3 versions'], cascade: false }))
        .pipe(minifyCSS())
        .pipe(gulp.dest('www/css'));
});

// Minify JS & concatenate
gulp.task('min-js', function() {
    gulp.src('src/js/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest('www/js'))
        .on('error', gutil.log);
    gulp.src('libs/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('www/libs'))
        .on('error', gutil.log);
});

// Direct Copy
gulp.task('copy', function () {
    gulp.src('src/libs/**')
      .pipe(gulp.dest('www/libs'));
    gulp.src('src/img/**/*.jpg')
      .pipe(gulp.dest('www/img'));
    gulp.src('src/img/**/*.png')
      .pipe(gulp.dest('www/img'));
    gulp.src('src/scss/fonts/*')
      .pipe(gulp.dest('www/css/fonts'));
    gulp.src('src/img/**/*.svg')
      .pipe(gulp.dest('www/img'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('css/*.css', ['min-css']);
    gulp.watch('json/**/*.json', ['min-json']);
    gulp.watch('src/scss/**/*.scss', ['sass']);
    gulp.watch(['libs/**/*.js',
                'src/js/**/*.js'],
              ['min-js']);
    gulp.watch(['templates/**/*.html',
                'src/partials/**/*.html',
                'src/*.html'],
              ['min-html']);
});

// gulp docs
// =========
gulp.task('docs', function () {
  var app = require('express')();
  app.use(require('express').static('doc'));
  app.listen(4022, function () {
    console.log('API docs served on http://localhost:4022');
  });
});

// Default Task
gulp.task('default', ['min-html', 'min-css', 'min-js', 'copy','watch']);
