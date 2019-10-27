const path = require('path');

module.exports = {
	entry: path.join(__dirname, 'lib', 'index.js'),
	mode: 'development',
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
	},
	devtool: 'source-maps',
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
			},
		],
	},
};
