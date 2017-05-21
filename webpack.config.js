var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');
var webpack = require('webpack');
var webpackMerge = require('webpack-merge');

const isProd = process.env.PROD;

const baseConfig = {
	output: {
		path: __dirname + '/bld',
		filename: 'app.js'
	},
	resolve: {
		extensions: ['.js', '.ts']
	},
	module: {
		rules: [
			{
				test: /\.(eot|otf|ttf|woff)$/,
				use: {
					loader: 'file-loader',
					options: {
						name: '[path][name]_[hash].[ext]'
					}
				}
			}
		]
	},
	plugins: [
		new webpack.optimize.OccurrenceOrderPlugin()
	]
}

const devConfig = {
	entry: [
		'webpack-dev-server/client?http://parkers-mbpr:8080',
		'webpack/hot/only-dev-server',
		'./app/App.ts'
	],
	output: {
		publicPath: 'http://parkers-mbpr:8080/bld'
	},
	devtool: 'source-map',
	devServer: {
		disableHostCheck: true,
		host: '0.0.0.0',
		port: 8080,
		hot: true
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
				test: /\.ts?$/,
				use: [
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
		'./app/App.ts'
	],
	output: {
		publicPath: '/bld/'
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
						loader: 'less-loader'
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
				test: /\.ts?$/,
				use: [
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
		new webpack.optimize.UglifyJsPlugin()
	]
};

module.exports = function (env) {
	env = env || {};

	const overrideConfig = env.prod ? prodConfig : devConfig;
	const config = webpackMerge(baseConfig, overrideConfig);

	return config;
}