const {src, dest, series, parallel} = require('gulp');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const watch = require('gulp-watch');

function copyHtml() {
    return src('./src/index.html').pipe(dest('./dist'));
};

function copyJs() {
    return src([
        './src/scripts/const.js',
        './src/scripts/customsAPI.js',
        './src/scripts/customs.js',
        './src/scripts/app.js',
    ])
        .pipe(concat('app.js'))
        .pipe(dest('./dist'));
};

function copyCss() {
    return src([
        './src/styles/reset.css',
        './src/styles/main.css',
    ])
        .pipe(concat('style.css'))
        .pipe(dest('./dist'));
};

function copyImages() {
    return src('./src/images/**/*').pipe(dest('./dist/images'));
};

function cleanDist() {
    return src('./dist', { read: false, allowEmpty: true }).pipe(clean());
};

module.exports = {
    build: series(cleanDist, parallel(copyHtml, copyJs, copyCss, copyImages)),
};