var gulp = require('gulp');
var concat = require('gulp-concat');
var minify = require('gulp-minify');
var cleanCss = require('gulp-clean-css');
var rev = require('gulp-rev');
var del = require('del');
var inject = require('gulp-inject');
var clean = require('gulp-clean');

gulp.task('clean-js', function () {
	return del([
		'public/build/js/*.js',
    'js/bundle-*.js'
	]);
});
 
gulp.task('clean-css', function () {
	return del([
		'public/build/css/*.css',
    'css/stylesheet-*.css'
	]);
});

gulp.task('index', ['pack-js', 'pack-css'], function () {
  var target = gulp.src('index.html');
  // It's not necessary to read the files (will speed up things), we're only after their paths:
  var sources = gulp.src(['public/build/js/*.js', 'public/build/css/*.css'], {read: false} );
 
  return target.pipe(inject(sources, {ignorePath:'public/build/', addRootSlash:false} ) )
    	.pipe(gulp.dest('public/build/'))
      .pipe(gulp.dest('./'));
});

gulp.task('all-html', ['index'], function () {
  var target = gulp.src('links/*.html');
  // It's not necessary to read the files (will speed up things), we're only after their paths:
  var sources = gulp.src(['css/stylesheet-*.css', 'js/bundle-*.js'], {read: false} );
 
  return target.pipe(inject(sources, {relative: true} ) )
      .pipe(gulp.dest('public/build/links/'))
      .pipe(gulp.dest('./links/'));
});

gulp.task('pack-js', ['clean-js','copy-xml-formatter-js'], function () {	
	
	return gulp.src([ 'plugins/jquery.min.js', 'plugins/popper.min.js','plugins/bootstrap.min.js', 'plugins/codemirror.js', 
		'plugins/addon/display/panel.js','plugins/placeholder.js', 
		'plugins/beautify-html.js', 'plugins/beautify.js','plugins/mode/*.js', 'plugins/mode/fold/*.js', 'js/lodash.min.js', 'js/main.js' ])
		.pipe(concat('bundle.js'))
		.pipe(minify({
            ext:{
                min:'.js'
            },
            noSource: true
        }))
        .pipe(rev())
		.pipe(gulp.dest('public/build/js'))
    .pipe(gulp.dest('js'))
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
        .pipe(gulp.dest('css'))
        .pipe(rev.manifest('public/build/rev-manifest.json', {
            merge: true
        }))
        .pipe(gulp.dest(''));;
});

gulp.task('indexing-files', function () {  
  return gulp.src(['favicon.ico','humans.txt','robots.txt','site.webmanifest','sitemap.xml'])
        .pipe(gulp.dest('public/build/'));
});

gulp.task('copy-xml-formatter-js', function () {  
  return gulp.src(['js/xml-formatter.js'])
        .pipe(gulp.dest('public/build/js/'));
});


 
gulp.task('default', ['index', 'all-html', 'indexing-files']);
