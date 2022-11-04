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
  return src('./src/sass/*.scss')
    .pipe(sass())
    .pipe(concat('app.css'))
    .pipe(dest('./build/styles/'))
    .pipe(browserSync.stream())
};

const pug2html = () => {
  return src('./src/pages/**/*.pug')
    .pipe(pug())
    .pipe(dest('./build/'))
    .pipe(browserSync.stream())
};

const destImages = () => {
  return src(['./src/images/*'])
    .pipe(dest('./build/images/'))
};

const svgsprite = () => {
  return src('./src/images/icons/minSVG/*.svg')
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: "../sprite.svg"
        }
      },
    }))

    .pipe(dest('./build/images/icons'));
};

const startWatch = () => {
  watch('./**/*.scss', sass2css);
  watch('./**/*.pug', pug2html);
};

const build = () => {
  sass2css();
  pug2html();
};

exports.startWatch = startWatch;
exports.browsersync = browsersync;
exports.svgsprite = svgsprite;
exports.pug2html = pug2html;

exports.build = build;

exports.default = parallel(sass2css, pug2html, browsersync, startWatch);