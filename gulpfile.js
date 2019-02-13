var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    notify = require('gulp-notify'),
    cleanCSS = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),
    htmlbeautify = require('gulp-html-beautify'),
    pug = require('gulp-pug');

gulp.task('html', function() {
    return gulp.src('./src/*.pug')
        .pipe(plumber({
            errorHandler: notify.onError()
        }))
        .pipe(pug({pretty:true}))
        .pipe(htmlbeautify())
        .pipe(gulp.dest('./build/'))
        .pipe(browserSync.stream())
});

gulp.task('css', function() {
    return gulp.src('src/style.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['> 0.1%'],
            cascade: false
        }))
        .pipe(cleanCSS({
            level: 2
        }))
        .pipe(gulp.dest('build/'))
        .pipe(browserSync.stream())
});

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: './build/'
        }
    });

    gulp.watch('src/*.scss', gulp.series('css'));
    gulp.watch('src/*.pug', gulp.series('html'));
});

gulp.task('build', gulp.series(
    'html',
    'css',
));

gulp.task('default', gulp.series('build', 'serve'));
