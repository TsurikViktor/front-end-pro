const { src, dest, series, parallel } = require('gulp');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const watch = require('gulp-watch');
//const $ = require("jquery");

function copyHtml() {
    return src('./src/index.html').pipe(dest('./dist'));
};

function copyJs() {
    return src([
        './src/Util/indexConst.js',
        './src/Util/indexAPI.js',
        './src/Util/controller.js',
        './src/Util/collection.js',
        './src/view/formView.js',
        './src/view/listView.js',
        './src/index.js',
    ])
        .pipe(concat('app.js'))
        .pipe(dest('./dist'));
};

function copyCss() {
    return src([
        './src/view/index.css',
    ])
        .pipe(concat('style.css'))
        .pipe(dest('./dist'));
};

function copyImages() {
    return src('./src/images/*').pipe(dest('./dist/images'));
};

function copyVendorJs() {
    return src([
        './node_modules/jquery/dist/jquery.min.js',

    ])
        .pipe(concat('vendor.js'))
        .pipe(dest('./dist'));
};

function cleanDist() {
    return src('./dist', { read: false, allowEmpty: true }).pipe(clean());
};

module.exports = {
    build: series(cleanDist, parallel(copyHtml, copyJs, copyCss, copyImages, copyVendorJs)),
}