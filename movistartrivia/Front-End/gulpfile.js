var gulp = require('gulp'),
    sass = require('gulp-sass');
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    livereload = require('gulp-livereload'),
    plumber = require('gulp-plumber'),
    webserver = require('gulp-webserver');
    

gulp.task('styles', function () {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(plumber())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest('./css'))
        .pipe(livereload());
});

// Scripts
gulp.task('app-scripts', function() {
  return gulp.src(['./src/js/*.js', './src/js/controllers/*.js', './src/js/directives/*.js', 
                   './src/js/filters/*.js', './src/js/services/*.js', './src/js/services/models*.js', './src/js/custom/*.js'])
    .pipe(plumber())
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('./js'))
    .pipe(livereload());
});

gulp.task('vendor-scripts', function() {
  return gulp.src('./src/js/vendor/*.js')
    .pipe(plumber())
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('./js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('./js'))
    .pipe(livereload());
});

// Watch
gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('./src/scss/*.scss', ['styles']);
    gulp.watch(['./src/js/*.js', './src/js/controllers/*.js', './src/js/directives/*.js', 
                   './src/js/filters/*.js', './src/js/services/*.js', './src/js/services/models*.js'], ['app-scripts']);
    gulp.watch('./src/js/vendor/*.js', ['vendor-scripts']);  
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
    gulp.start('styles','vendor-scripts', 'app-scripts');
});