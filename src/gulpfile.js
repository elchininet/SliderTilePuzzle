var gulp    = require("gulp"),
	sass    = require("gulp-sass"),
	prefix  = require("gulp-autoprefixer"),
	uglycss = require("gulp-uglifycss"),

	concat  = require("gulp-concat"),
	uglyjs  = require("gulp-uglify"),
	jshint  = require("gulp-jshint"),
	stylish = require("jshint-stylish"),
	menu    = require("gulp-task-menu");

gulp.task("styles", function () {

	gulp.src("app/sass/main.sass")
		.pipe(sass().on("error", sass.logError))
		.pipe(prefix({
			browsers: ["last 20 versions"],
			cascade: false
		}))
		.pipe(uglycss())
		.pipe(gulp.dest("../bin/css/"));

});

gulp.task("js", function () {

	gulp.src(["app/app.js", "app/services/puzzle-methods.js", "app/controllers/*.js"])
		.pipe(concat("app.js"))
		.pipe(uglyjs({mangle: false, compress: true}))
		.pipe(gulp.dest("../bin/js/"));

});

gulp.task("jshint", function () {

	gulp.src(["app/*.js", "app/**/*.js"])
		.pipe(jshint())
		.pipe(jshint.reporter(stylish));

});

gulp.task("watch", function () {

	gulp.watch("app/sass/*.sass", ["styles"]);
	gulp.watch(["app/*.js", "app/**/*.js"], ["js"]);

});

gulp.task("default", function () {

	menu(this, ["default"]);

});