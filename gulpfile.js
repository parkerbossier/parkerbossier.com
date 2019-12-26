const { dest, series, src, watch } = require('gulp');
const inlinesource = require('gulp-inline-source');
const LessAutoprefix = require('less-plugin-autoprefix');
const autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] });
const less = require('gulp-less');
const clean = require('gulp-clean');

async function compileLess() {
	return src('./app/styles.less')
		.pipe(less({
			plugins: [autoprefix]
		}))
		.pipe(dest('./bld'));
}

async function compileHtml() {
	return src('./app/index.html')
		.pipe(inlinesource({
			compress: false
		}))
		.pipe(dest('./bld'));
}

const doBuild = () => {
	doClean();
	series(compileLess, compileHtml);
};
const doClean = () => {
	src('./bld/**').pipe(clean());
};
const doWatch = () => {
	doBuild();
	watch(['app/**/*'], {}, build);
};

exports.clean = doClean;
exports.default = doBuild;
exports.watch = doWatch;
