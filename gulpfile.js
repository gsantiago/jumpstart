/**
 * Gulp File
 * http://gulpjs.com/
 */

var gulp = require('gulp')
var sourcemaps = require('gulp-sourcemaps')
var stylus = require('gulp-stylus')
var rename = require('gulp-rename')
var browserify = require('browserify')
var source = require('vinyl-source-stream')
var buffer = require('vinyl-buffer')
var uglify = require('gulp-uglify')
var gutil = require('gulp-util')
var spritesmith = require('gulp.spritesmith')
var standard = require('gulp-standard')

/**
 * Stylus Task
 */

gulp.task('css', function () {
  gulp.src('./src/stylus/index.styl')
    .pipe(sourcemaps.init())
    .pipe(stylus({
      compress: true,
      use: [
        require('jeet')(),
        require('rupture')()
      ],
      'include css': true,
      paths: ['node_modules']
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('./dist/assets/css'))
})

/**
 * Browserify Task
 */

gulp.task('js', function () {
  var b = browserify({
    entries: './src/js/main.js',
    debug: true
  })

  return b.bundle()
    .pipe(source('bundle.min.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        .pipe(uglify())
        .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/assets/js/'))
})

/**
 * Runs Standard against the JS code.
 */

gulp.task('lint', function () {
  return gulp.src('./src/js/*.js')
    .pipe(standard())
    .pipe(standard.reporter('default', {
      breakOnError: true
    }))
})

/**
 * Build the sprites
 */

gulp.task('sprite', function () {
  var spriteData = gulp.src('./src/sprites/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.styl',
    imgPath: '../img/sprite.png'
  }))

  spriteData.img
    .pipe(gulp.dest('./dist/assets/img/'))

  spriteData.css
    .pipe(gulp.dest('./src/stylus/vendor'))
})

/**
 * Watch
 */

gulp.task('watch', function () {
  gulp.watch('./src/js/**/*.js', ['lint', 'js'])
  gulp.watch('./src/stylus/**/*.styl', ['css'])
})

/**
 * Default Task
 */

gulp.task('default', ['sprite', 'css', 'js'])
