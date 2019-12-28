const { dest, series, src, watch } = require('gulp');
const clean = require('gulp-clean');
const htmlmin = require('gulp-htmlmin');
const inlinesource = require('gulp-inline-source');
const less = require('gulp-less');
const LessAutoprefix = require('less-plugin-autoprefix');
const postcss = require('gulp-postcss');
const postcssLess = require('postcss-less');
const postcssSorting = require('postcss-sorting');
const postcssSortingOptions = require('./.postcss-sorting.json');
const sourcemaps = require('gulp-sourcemaps');

const autoprefix = new LessAutoprefix();

/** Completely cleans the build artifacts */
function cleanBld() {
	return src('./bld', { allowEmpty: true, dot: true, read: false })
		.pipe(clean());
}

// TODO: why doesn't VS Code auto refresh the file after this writes?
function formatLess() {
	return src('./app/styles.less')
		.pipe(postcss([postcssSorting(postcssSortingOptions)], { syntax: postcssLess }))
		.pipe(dest('./app'));
}

function compileLess() {
	// sourcemaps get removed during inline minification in prod,
	// so it's easier to always leave it in
	return src('./app/styles.less')
		.pipe(sourcemaps.init())
		.pipe(less({ plugins: [autoprefix] }))
		.pipe(sourcemaps.write())
		.pipe(dest('./bld'));
}

function compileHtml() {
	const stream = src('./app/index.html')
		.pipe(inlinesource({
			// only minify inline sources in prod
			compress: isProd()
		}));

	// only minify HTML in prod
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
exports.formatLess = formatLess;
exports.publish = doPub;
exports.watch = doWatch;
