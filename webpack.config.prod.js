var path = require("path");
var webpack = require("webpack");

module.exports = {
	entry: "./source/index.js",
	output: {
		path: path.join(__dirname, "./lib"),
		filename: "index.js",
		libraryTarget: "umd",
		library: "CircularSlider",
	},
	resolveLoader: {
		moduleExtensions: ["-loader"],
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: "babel",
				include: path.join(__dirname, "./source"),
			},
			{
				test: /\.scss$/,
				loader: "style-loader!css-loader?minimize!sass-loader",
				include: path.join(__dirname, "./source"),
			},
			{
				test: /\.css$/,
				loader: "style-loader!css-loader?minimize",
				include: path.join(__dirname, "./source"),
			},
		],
	},
};
