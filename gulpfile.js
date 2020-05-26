"use strict";

var gulp = require("gulp");
var del = require("del");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var rename = require("gulp-rename");

var less = require("gulp-less");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var cssmin = require("gulp-csso");
var posthtml = require("gulp-posthtml");
var server = require("browser-sync").create();

gulp.task("css", function () {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(cssmin())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("images", function() {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
  .pipe(imagemin([
    imagemin.gifsicle({interlaced: true}),
    imagemin.mozjpeg({quality: 75, progressive: true}),
    // imagemin.optipng({optimizationLevel: 5}),
    imagemin.svgo({
        plugins: [
            {removeViewBox: true},
            {cleanupIDs: false}
        ]
    })
]))
  .pipe(gulp.dest("source/img"));
});

gulp.task("webp", function () {
  return gulp.src("source/img/**/*.{png,jpg}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("source/img"));
});

gulp.task("js", function () {
  return gulp.src("source/js/**/*.js")
    .pipe(gulp.dest("build"));
});

gulp.task("html", function () {
  return gulp.src("source/*.html")
    .pipe(posthtml())
    .pipe(gulp.dest("build"));
});

gulp.task("clean", function () {
  return del("build");
});

gulp.task("copy", function () {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**",
    "source/js/**",
    "source/*.ico"
  ], {
    base: "source"
  })
  .pipe(gulp.dest("build"));
});

gulp.task("build", gulp.series(
  "clean",
  "copy",
  "css",
  "html"
));

gulp.task("server", function () {
  server.init({
   server: "build/"
  });

  gulp.watch("source/less/**/*.less", gulp.series("css"));
  gulp.watch("source/img/icon-*.svg", gulp.series("html", "refresh"));
  gulp.watch("source/*.html", gulp.series("html", "refresh"));
  gulp.watch("source/js/**/*.js", gulp.series("js"));
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
});

gulp.task("start", gulp.series("build", "server"));
