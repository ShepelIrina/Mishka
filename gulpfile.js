const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass")(require('sass'));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sync = require("browser-sync").create();
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const rename = require("gulp-rename");
const svgstore = require("gulp-svgstore");
const csso = require("gulp-csso");
const del = require("del");
const uglify = require("gulp-uglify");
const htmlmin = require("gulp-htmlmin");

const clean = () => {
  return del("build");
};

exports.clean = clean;

const copy = () => {
  return gulp.src([
    "src/fonts/**/*.{woff,woff2}",
    "src/img/**",
    "src/*.ico"
  ], {
    base: "src"
  })
  .pipe(gulp.dest("build"));
};

exports.copy = copy;

// Styles

const styles = () => {
  return gulp.src("src/scss/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("src/css"))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("src/css"))
    .pipe(sync.stream());
}

exports.styles = styles;

// image

const image = () => {
  return gulp.src("src/img/**/*.{jpg,png,svg}")
    .pipe(imagemin([
      imagemin.mozjpeg({quality: 90, progressive: true}),
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("src/img"));
}

exports.image = image;

const webpimage = () => {
  return gulp.src("src/img/**/*.{png,jpg}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("src/img"));
}

exports.webpimage = webpimage;

const sprite = () => {
  return gulp.src("src/img/**/icon-*.svg")
    .pipe(svgstore())
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
}

exports.sprite = sprite;

// Scripts

const scripts = () => {
  return gulp.src("src/js/*.js")
    .pipe(gulp.dest("build/js"))
    .pipe(uglify())
    .pipe(rename("script.min.js"))
    .pipe(gulp.dest("build/js"))
};

exports.scripts = scripts;

// Html

const html = () => {
  return gulp.src("src/*.html")
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest("build/"))
};

exports.html = html;


// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: "src"
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

// Watcher

const watcher = () => {
  gulp.watch("src/scss/**/*.scss", gulp.series("styles"));
  gulp.watch("src/*.html").on("change", sync.reload);
};

exports.default = gulp.series(
  styles, server, watcher
);

exports.build = gulp.series(
  // clean,
  // copy,
  styles,
  // scripts,
  // image,
  // webpimage,
  // sprite,
  // html
);

exports.start = gulp.series(
  // clean,
  // copy,
  styles,
  // scripts,
  // sprite,
  // html,
  server,
  watcher
);
