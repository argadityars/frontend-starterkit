var gulp 		= require("gulp"),
	browserSync = require("browser-sync"),
	sass 		= require("gulp-sass"),
	prefix		= require("gulp-autoprefixer"),
	bourbon 	= require("node-bourbon").includePaths,
	neat 		= require("node-neat").includePaths,
	plumber 	= require('gulp-plumber'),
	notify 		= require("gulp-notify");


// Compiles all gulp tasks
gulp.task("default", ["watch"]);

// Live reload anytime a file changes
gulp.task("watch", ["browserSync", "sass"], function() {
	gulp.watch("src/scss/**/*.scss", ["sass"]);
	gulp.watch("dist/*.html").on("change", browserSync.reload);
});

// Spin up a server
gulp.task("browserSync", function() {
	browserSync({
		server: {
			baseDir: "dist",
			online: false
		}
	})
});

// Compile SASS files
gulp.task("sass", function() {
	gulp.src("src/scss/**/*.scss")
		.pipe(plumber({
			errorHandler: notify.onError("Error: <%= error.message %>")
		}))
		.pipe(sass({
				includePaths: bourbon,
				includePaths: neat
		}))
		.pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
		.pipe(gulp.dest("dist/assets/css"))
		.pipe(browserSync.reload({
			stream: true
		}))
});