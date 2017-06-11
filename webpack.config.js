var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');
var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
require('babel-polyfill');

const isProd = process.env.PROD;

const baseConfig = {
	entry: [
		'babel-polyfill'
	],
	output: {
		path: __dirname + '/',
		filename: 'app.js'
	},
	resolve: {
		extensions: ['.js', '.ts', '.tsx']
	},
	module: {
		rules: [
			
		]
	},
	plugins: [
		new webpack.optimize.OccurrenceOrderPlugin()
	]
}

const host = true ? 'parkers-mbpr' : 'localhost';

const devConfig = {
	entry: [
		`webpack-dev-server/client?http://${host}:8080`,
		'react-hot-loader/patch',
		'webpack/hot/only-dev-server',
		'./app/index.tsx'
	],
	output: {
		publicPath: `http://${host}:8080/`
	},
	devtool: 'source-map',
	devServer: {
		host: '0.0.0.0',
		port: 8080,
		hot: true,
		disableHostCheck: true
	},
	module: {
		rules: [
			{
				test: /\.less$/,
				use: [
					{ loader: 'style-loader' },
					{
						loader: 'css-loader',
						options: {
							sourceMap: true
						}
					},
					{
						loader: 'less-loader',
						options: {
							sourceMap: true
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							plugins: function () {
								return [
									require('autoprefixer')
								];
							}
						}
					}
				]
			},
			{
				test: /\.tsx?$/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['es2015', 'react', 'react-hmre'],
							plugins: ['react-hot-loader/babel']
						}
					},
					{ loader: 'awesome-typescript-loader' }
				],
				exclude: '/node_modules'
			}
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin()
	]
};

const prodConfig = {
	entry: [
		'./app/index.tsx'
	],
	output: {
		//publicPath: '/bld'
		publicPath: '/'
	},
	module: {
		rules: [
			{
				test: /\.less$/,
				use: [
					{ loader: 'style-loader' },
					{
						loader: 'css-loader',
						options: {
							minimize: true
						}
					},
					{
						loader: 'less-loader',
						options: {
							//sourceMap: true
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							plugins: function () {
								return [
									require('autoprefixer')
								];
							}
						}
					}
				]
			},
			{
				test: /\.tsx?$/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['es2015', 'react']
						}
					},
					{
						loader: 'awesome-typescript-loader'
					}
				],
				exclude: '/node_modules'
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production')
			}
		}),
		new webpack.optimize.UglifyJsPlugin(),
		/*
		require('rollup-plugin-replace')({
			'process.env.NODE_ENV': JSON.stringify('production')
		}),
		require('rollup-plugin-commonjs')()
		*/
	]
};

module.exports = function (env) {
	env = env || {};

	const overrideConfig = env.prod ? prodConfig : devConfig;
	const config = webpackMerge(baseConfig, overrideConfig);

	return config;
}