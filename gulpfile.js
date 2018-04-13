const gulp = require("gulp");
const postcss = require("gulp-postcss");
const stylelint = require("stylelint");
const gulpStylelint = require("gulp-stylelint");

const path = require("path");

const APP_PATH = path.join(__dirname, "app");
const STYLES_PATH = path.join(APP_PATH, "**/*");


gulp.task("css:lint", () => {
  function callback(file) {
    const parsers = {
      ".scss": require("postcss-scss"),
      ".less": require("postcss-less")
    };

    return {
      plugins: [
        stylelint()
      ],
      options: {
        parser: parsers[file.extname] || false
      }
    };
  }

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
