const { src, dest, parallel, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const pug = require('gulp-pug');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const svgSprite = require('gulp-svg-sprite');


const browsersync = () => {
  browserSync.init({
    server: { baseDir: './build/' },
    notify: false,
    online: true,
  });
};

const sass2css = () => {
  return src(['./src/sass/*.scss'], { sourcemaps: true })
    .pipe(sass())
    .pipe(concat('app.css'))
    .pipe(dest('./build/styles/'))
    .pipe(browserSync.stream())
};

const pug2html = () => {
  return src(['./src/pages/*.pug'])
    .pipe(pug())
    .pipe(dest('./build/'))
    .pipe(browserSync.stream())
};

const destImages = () => {
  return src(['./src/images/*'])
    .pipe(dest('./build/images/'))
};

const startWatch = () => {
  watch(['./**/*.scss'], sass2css);
  watch(['./**/*.pug'], pug2html);
};

const build = () => {
  sass2css();
  pug2html();
  destImages;
};

exports.startWatch = startWatch;
exports.browsersync = browsersync;

exports.build = build;

exports.default = parallel(browsersync, startWatch);