var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-sass'),
	plumber = require('gulp-plumber'),
	browserSync = require("browser-sync").create(),
	prefix = require('gulp-autoprefixer');
	// image compression
	// browser prefixing
	// concat
	// sourcemaps



	// Scripts Task: uglify

	gulp.task('scripts', function() {
		gulp.src('js/*.js')
			.pipe(plumber())
			.pipe(uglify())
			.pipe(gulp.dest('build/js'))
	});

	// styles Task: uglify

	gulp.task('styles', function() {
		gulp.src('sass/**/*.scss')
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		//.pipe(plumber())
		.pipe(prefix({ browsers: ['> 1%', '> 5%', 'IE 7'], cascade: false, flexbox: 'no-2009' }))
		.pipe(gulp.dest('css'))
		.pipe(browserSync.stream({match: 'sass/**/*.scss'}));
	});


	// Watch task

	gulp.task('watch', function() {
		gulp.watch('js/*.js', ['scripts']);
		gulp.watch('sass/**/*.scss', ['styles']);
		gulp.watch("/*.html");
	});



	// Static Server + watching scss/html files
	gulp.task('serve', ['watch'], function() {

	    browserSync.init({
	        server: "./"
	    });
	    gulp.watch('js/*.js', ['scripts']).on('change', browserSync.reload);
	    gulp.watch("sass/**/*.scss", ['styles']).on('change', browserSync.reload);
	    gulp.watch("*.html").on('change', browserSync.reload);
	});


gulp.task('default', ['scripts', 'styles', 'watch', 'serve']);



// https://github.com/ai/browserslist#queries
//https://github.com/postcss/autoprefixer#options
