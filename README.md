# gulp-base64-webfont-css-extended
Gulp plugin to generate css files with Base64 encoded font data from woff and woff2 files

Based on great work of ygoto3. Go and check this great work: https://github.com/ygoto3/gulp-base64-webfont-css

Since my changes divereged a bit I decided to create a separate package.

## Usage

### Example Gulp task

```
var base64WebfontCss = require('gulp-base64-webfont-css-extented');
var concat = require('gulp-concat');
var cleanCss = require('gulp-clean-css');
var config = {
    src : {
        fonts: {
            woff: 'assets/fonts/**/*.woff',
            woff2: ''assets/fonts/**/*.woff2'
        }
    }
}

gulp.task('woff', function () {
    return gulp.src(config.src.fonts.woff)
      .pipe(base64WebfontCss())
      .pipe(concat('fonts.woff.css'))
      .pipe(cleanCss())
      .pipe(gulp.dest(config.dest.styles));
  });

  gulp.task('woff2', function () {
    return gulp.src(config.src.fonts.woff2)
      .pipe(base64WebfontCss())
      .pipe(concat('fonts.woff2.css'))
      .pipe(cleanCss())
      .pipe(gulp.dest(config.dest.styles));
  });

  gulp.task('fonts', ['woff', 'woff2']);

  ```

### File naming

FONTNAME_FONTWEIGHT_FONTSTYLE

Examples:
Open-Sans_300_normal.woff
Open-Sans_300_normal.woff2
