var webpack = require('webpack');
var path = require('path');

module.exports = {

	entry: './src/app.js',
	output: {
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					presets: ['react', 'es2015']
				}
			},
			{
				test: /\.css$/,
				use: [
					"style-loader",
					"css-loader"
				]
			}

		]
	},
	devtool: 'source-map',
	devServer: {
		port: 3000,
		contentBase: [
            './'
		],
		inline: true,
		publicPath: '/build/'
	}
}