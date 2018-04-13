const gulp = require("gulp");
const postcss = require("gulp-postcss");
const stylelint = require("stylelint");
const gulpStylelint = require("gulp-stylelint");
const autoprefixer = require("autoprefixer");

const path = require("path");

const APP_PATH = path.join(__dirname, "app");
const STYLES_PATH = path.join(APP_PATH, "**/*");
const DIST_PATH = path.join(APP_PATH, "dist");


gulp.task("css:lint", () => {
  return gulp.src(STYLES_PATH)
    .pipe(gulpStylelint({
      failAfterError: false,
      reporters: [{
        formatter: "verbose",
        console: true
      }]
    }));
});

gulp.task("css:lint-fix", () => {
  return gulp.src(STYLES_PATH)
    .pipe(gulpStylelint({
      failAfterError: false,
      fix: true
    }))
    .pipe(gulp.dest(APP_PATH));
});

gulp.task("autoprefixer", () => {
  function callback(file) {
    const parsers = {
      ".scss": require("postcss-scss"),
      ".less": require("postcss-less")
    };

    return {
      plugins: [
        autoprefixer({
          browsers: [
            "last 5 versions"
          ]
        })
      ],
      options: {
        parser: parsers[file.extname] || false
      }
    };
  }

  return gulp.src(STYLES_PATH, { base: "app" })
    .pipe(postcss(callback))
    .pipe(gulp.dest(DIST_PATH));
});
