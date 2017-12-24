var path = require("path");
var webpack = require("webpack");

module.exports = {
    entry: "./demo/index.js",
    output: {
        path: __dirname,
        filename: "index.js",
        publicPath: "/static/",
    },
    resolveLoader: {
        moduleExtensions: ["-loader"],
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ["react-hot"],
                include: [path.join(__dirname, "./source"), path.join(__dirname, "./demo")],
            },
            {
                test: /\.js$/,
                loader: "babel",
                include: [path.join(__dirname, "./source"), path.join(__dirname, "./demo")],
            },
            {
                test: /\.html$/,
                loader: "file?name=[name].html",
            },
            {
                test: /\.scss$/,
                loader: "style-loader!css-loader?minimize!sass-loader",
                include: [path.join(__dirname, "./source"), path.join(__dirname, "./demo")],
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader?minimize",
                include: [path.join(__dirname, "./source"), path.join(__dirname, "./demo")],
            },
        ],
    },
};
