var gulp = require('gulp');
var concat = require('gulp-concat');
var minify = require('gulp-minify');
var cleanCss = require('gulp-clean-css');
var rev = require('gulp-rev');
var del = require('del');
var inject = require('gulp-inject');

gulp.task('clean-js', function () {
	return del([
		'public/build/js/*.js'
	]);
});
 
gulp.task('clean-css', function () {
	return del([
		'public/build/css/*.css'
	]);
});

gulp.task('index', ['pack-js', 'pack-css'], function () {
  var target = gulp.src('index.html');
  // It's not necessary to read the files (will speed up things), we're only after their paths:
  var sources = gulp.src(['public/build/js/*.js', 'public/build/css/*.css'], {read: false} );
 
  return target.pipe(inject(sources, {ignorePath:'public/build/', addRootSlash:false} ) )
    	.pipe(gulp.dest('public/build/'));
});

gulp.task('pack-js', ['clean-js'], function () {	
	return gulp.src([ 'plugins/*.js', 'plugins/mode/*.js', 'plugins/mode/fold/*.js', 'js/*.js' ])
	return gulp.src([ 'plugins/jquery.min.js', 'plugins/bootstrap.min.js', 'plugins/codemirror.js','plugins/beautify-html.js','plugins/beautify.js','plugins/placeholder.js','plugins/popper.min.js', 'plugins/mode/*.js', 'plugins/mode/fold/*.js', 'js/*.js' ])
		.pipe(concat('bundle.js'))
		.pipe(minify({
            ext:{
                min:'.js'
            },
            noSource: true
        }))
        .pipe(rev())
		.pipe(gulp.dest('public/build/js'))
		.pipe(rev.manifest('public/build/rev-manifest.json', {
            merge: true
        }))
        .pipe(gulp.dest(''));
});

gulp.task('pack-css', ['clean-css'], function () {	
	return gulp.src('css/*.css')
		.pipe(concat('stylesheet.css'))
		.pipe(cleanCss())
   		.pipe(rev())
        .pipe(gulp.dest('public/build/css'))
        .pipe(rev.manifest('public/build/rev-manifest.json', {
            merge: true
        }))
        .pipe(gulp.dest(''));;
});
 
gulp.task('default', ['index']);
