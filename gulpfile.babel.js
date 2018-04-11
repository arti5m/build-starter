import autoprefixer from 'gulp-autoprefixer';
import babelify from 'babelify';
import browserify from 'browserify';
import buffer from 'vinyl-buffer';
import eslint from 'gulp-eslint';
import gulp from 'gulp';
import gulpStylelint from 'gulp-stylelint';
import notify from 'gulp-notify';
import pug from 'gulp-pug';
import sass from 'gulp-sass';
import stylus from 'gulp-stylus';
import source from 'vinyl-source-stream';

const src = './src/';
const dest = './public/';

gulp.task('js', () => {
  browserify(`${src}js/site.js`)
    .transform(babelify, { presets: ['env'] })
    .bundle()
    .pipe(source('site.js'))
    .pipe(buffer())
    .pipe(gulp.dest(`${dest}js`))
    .pipe(gulp.dest(`${dest}js`))
    .pipe(notify('scripts task complete'));
});

gulp.task('sass', () =>
  gulp.src([
    `${src}sass/site.scss`
  ])
    .pipe(gulpStylelint({
      reporters: [
        { formatter: 'string', console: true }
      ]
    }))
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: [ 'last 3 versions', 'ie >= 8'],
      cascade: false
    }))
    .pipe(gulp.dest(`${dest}css`))
    .pipe(notify('styles task complete'))
);

gulp.task('stylus', () => {
  return gulp.src([
        `${src}stylus/site.styl`
      ])
      .pipe(gulpStylelint({
        reporters: [
          { formatter: 'string', console: true }
        ]
      }))
      .pipe(stylus())
      .pipe(autoprefixer({
        browsers: [ 'last 3 versions', 'ie >= 8'],
        cascade: false
      }))
      .pipe(gulp.dest(`${dest}css`))
      .pipe(notify('styles task complete'));
});

gulp.task('imgs', () =>
  gulp.src([`${src}/imgs/*.png`, `${src}/imgs/*.jpg`, `${src}/imgs/*.svg`], { base: `${src}/imgs/` })
    .pipe(gulp.dest(`${dest}/imgs`))
);

gulp.task('lint', () =>
  gulp.src([`${src}js/**/*.js`, `!node_modules/**`])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
);
 
gulp.task('views', () =>
  gulp.src(`${src}pug/*.pug`)
    .pipe(pug())
    .pipe(gulp.dest(`${dest}`))
);

gulp.task('watch', () => {
  gulp.watch(`${src}sass/**/*.scss`, ['sass']);
  gulp.watch(`${src}stylus/**/*.styl`, ['stylus']);
  gulp.watch(`${src}js/**/*.js`, ['js', 'lint']);
  gulp.watch(`${src}pug/**/*.pug`, ['views']);
});

gulp.task('default', ['build', 'watch']);
gulp.task('build', ['lint', 'js', 'sass', 'stylus', 'imgs', 'views']);
