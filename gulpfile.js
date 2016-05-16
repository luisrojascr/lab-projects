var gulp = require('gulp'),
    sass = require('gulp-sass');
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    livereload = require('gulp-livereload'),
    plumber = require('gulp-plumber'),
    webserver = require('gulp-webserver');
    

gulp.task('styles', function () {
    return gulp.src('./scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(plumber())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(cleanCSS({debug: true}, function(details) {
            console.log(details.name + ': ' + details.stats.originalSize);
            console.log(details.name + ': ' + details.stats.minifiedSize);
        }))
        .pipe(gulp.dest('./dist/css'))
        .pipe(livereload());
});

// Scripts
gulp.task('app-scripts', function() {
  return gulp.src(['./js/*.js', './js/services/*.js', './js/controllers/*.js',  
                   './js/directives/*.js'])
    .pipe(plumber())
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./dist/js'))
    //.pipe(uglify())
    .pipe(livereload());
});

// Watch
gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('./scss/*.scss', ['styles']);
    gulp.watch(['./js/*.js', './js/services/*.js', './js/controllers/*.js',  
                './js/directives/*.js'], ['app-scripts']);
});

gulp.task('webserver', function() {
  gulp.src('./')
    .pipe(webserver({
      fallback:   'index.html',
      port: 8080,
      livereload: true,
      directoryListing: false,
      open: true
    }));
});

// Default task
gulp.task('default', ['watch','webserver'], function() {
    gulp.start('styles', 'app-scripts');
});