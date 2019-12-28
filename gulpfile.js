const { dest, series, src, watch } = require('gulp');
const autoprefixer = require('autoprefixer');
const clean = require('gulp-clean');
const htmlmin = require('gulp-htmlmin');
const inlinesource = require('gulp-inline-source');
const less = require('gulp-less');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');

/** Completely cleans the build artifacts */
function cleanBld() {
	return src('./bld', { allowEmpty: true, dot: true, read: false })
		.pipe(clean());
}

function compileLess() {
	return src('./app/styles.less')
		.pipe(sourcemaps.init())
		.pipe(less())
		.pipe(sourcemaps.write())
		.pipe(postcss([autoprefixer]))
		.pipe(dest('./bld'));
}

function compileHtml() {
	const stream = src('./app/index.html')
		.pipe(inlinesource({
			compress: isProd()
		}));
	if (isProd())
		stream.pipe(htmlmin({
			collapseWhitespace: true
		}));
	stream.pipe(dest('./bld'));
	return stream;
}

function isProd() {
	return process.env.NODE_ENV === 'production';
}

/** Merges all content in `/app/static` into `/bld` */
function mergeStatic() {
	return src('./app/static/**', { dot: true })
		.pipe(dest('./bld'));
}

/** Removes all files from the build artifacts that are not neede dfor deploy */
function postBuildCleanup() {
	return src('./bld/*.css')
		.pipe(clean());
}

const doBuild = series(cleanBld, compileLess, compileHtml, mergeStatic);
const doPub = series(doBuild, postBuildCleanup);
const doWatch = series(doBuild, () => { watch(['app/**/*'], {}, doBuild); });

exports.clean = cleanBld;
exports.publish = doPub;
exports.watch = doWatch;
