'use strict';
const gulp = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const pug = require('gulp-pug');
const spritesmith = require('gulp.spritesmith');
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');
const mmq = require('gulp-merge-media-queries');


function style() {
    return gulp.src(['./app/scss/**/*.scss', './app/views/modules/**/*.scss', './app/views/mixins/**/*.scss'])
        .pipe(sourcemaps.init())
        .pipe(concat('my_style.css'))
        .pipe(sass({ "bundleExec": true }).on('error', sass.logError))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 5 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dev/css'))
}

function html() {
    return gulp.src('./app/views/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('./dev'))
}

function concatJs() {
    return gulp.src(['./app/scss/**/*.js', './app/views/modules/**/*.js'])
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./dev/js'))
}

function sprite() {

    const spriteData = gulp.src('./app/img/sprite/*.*')
        .pipe(spritesmith({
            imgName: 'sprite.png',
            cssName: 'sprite.scss',
            imgPath: '../img/sprite.png'
        }));

    spriteData.img.pipe(gulp.dest('./dev/img/')); // путь, куда сохраняем картинку
    spriteData.css.pipe(gulp.dest('./app/scss/')); // путь, куда сохраняем стили

    return spriteData;

}

//TODO Иногда отваливается и не собирает автоматически
function imageMin() {
    return gulp.src('./app/img/*')
        .pipe(imagemin([
            imagemin.mozjpeg({ quality: 95, progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 }),
            imagemin.svgo({
                plugins: [
                    { removeViewBox: true },
                    { cleanupIDs: false }
                ]
            })
        ]))
        .pipe(gulp.dest('./dev/img/'))
}

function serve() {
    browserSync.init({
        server: {
            baseDir: './dev'
        }
    });
    gulp.watch('./app/scss/**/*.scss', style).on('change', browserSync.reload);
    gulp.watch('./app/views/modules/**/*.scss', style).on('change', browserSync.reload);
    gulp.watch('./app/views/mixins/**/*.scss', style).on('change', browserSync.reload);
    gulp.watch('./app/views/**/*.pug', html).on('change', browserSync.reload);
    gulp.watch('./app/img/**/*', imageMin).on('change', browserSync.reload);
    gulp.watch('./app/js/**/*.js', concatJs).on('change', browserSync.reload);
    gulp.watch('./app/views/modules/**/*.js', concatJs).on('change', browserSync.reload);
    gulp.watch('./dev/*.html').on('change', browserSync.reload);
    gulp.watch('./app/img/sprite/*.*', sprite).on('change', browserSync.reload);
}

function devStart() {
    style();
    html();
    concatJs();
    sprite();
    serve();
}

//BUILD

function buildCss() {
    return gulp.src('./dev/css/**/*.css')
        .pipe(mmq({
            log: true
        }))
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest('./build/css'));
}

function buildHtml() {
    return gulp.src('./dev/*.html')
        .pipe(gulp.dest('./build/'));
}

function buildJs() {
    return gulp.src('./dev/js/*.js')
        .pipe(gulp.dest('./build/js/'));
}

function buildImg() {
    return gulp.src('./dev/img/**.*')
        .pipe(gulp.dest('./build/img/'));
}

async function build() {
    buildCss();
    buildHtml();
    buildJs();
    buildImg();
}



exports.devStart = devStart;

exports.style = style;
exports.html = html;
exports.imageMin = imageMin;

exports.concatJs = concatJs;
exports.sprite = sprite;
exports.serve = serve;

exports.build = build;
exports.buildCss = buildCss;
exports.buildHtml = buildHtml;
exports.buildJs = buildJs;
exports.buildImg = buildImg;