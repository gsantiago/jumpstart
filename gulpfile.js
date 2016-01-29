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
var iconfont = require('gulp-iconfont')
var consolidate = require('gulp-consolidate')

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
 * Iconfont
 * https://github.com/nfroidure/gulp-iconfont
 */

gulp.task('icons', function () {
  return gulp.src(['src/icons/*.svg'])
    .pipe(iconfont({
      fontName: 'icons', // required
      appendUnicode: true, // recommended option
      normalize: true,
      formats: ['ttf', 'eot', 'woff', 'woff2', 'svg'],
      timestamp: Math.round(Date.now() / 1000) // recommended to get consistent builds when watching files
    }))
    .on('glyphs', function (glyphs, options) {
      glyphs.map(function (g) {
        g.className = 'icon'
        g.unicode = '\\' + g.unicode[0].charCodeAt(0).toString(16).toUpperCase()
        return g
      })
      gulp.src('src/icons/template.styl')
        .pipe(consolidate('handlebars', {
          glyphs: glyphs,
          fontName: 'icons',
          fontPath: '../fonts/',
          className: 'icon'
        }))
        .pipe(rename('icons.styl'))
        .pipe(gulp.dest('src/stylus/vendor'))
    })
    .pipe(gulp.dest('dist/assets/fonts'))
})

/**
 * Watch
 */

gulp.task('watch', function () {
  gulp.watch('src/js/**/*.js', ['lint', 'js'])
  gulp.watch('src/stylus/**/*.styl', ['css'])
  gulp.watch('src/icons/*.svg', ['icons'])
})

/**
 * Default Task
 */

gulp.task('default', ['sprite', 'css', 'js'])
