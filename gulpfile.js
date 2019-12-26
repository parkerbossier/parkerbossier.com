const { dest, series, src, watch } = require('gulp');
const inlinesource = require('gulp-inline-source');
const LessAutoprefix = require('less-plugin-autoprefix');
const autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] });
const less = require('gulp-less');
const clean = require('gulp-clean');

function cleanBld() {
	return src('./bld', { allowEmpty: true, read: false })
		.pipe(clean());
}
function compileLess() {
	return src('./app/styles.less')
		.pipe(less({
			plugins: [autoprefix]
		}))
		.pipe(dest('./bld'));
}

function compileHtml() {
	return src('./app/index.html')
		.pipe(inlinesource({
			compress: false
		}))
		.pipe(dest('./bld'));
}

const doBuild = series(cleanBld, compileLess, compileHtml);
const doWatch = series(doBuild, () => { watch(['app/**/*'], {}, build); });

exports.clean = cleanBld;
exports.default = doBuild;
exports.watch = doWatch;
