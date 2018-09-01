const path = require("path");
const webpack = require("webpack");
const UglifyWebpackPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
    entry: {
        app: ["./src/index.ts"],
    },
    output: {
        path: path.resolve(__dirname, "./lib"),
        filename: "index.js",
        library: "",
        libraryTarget: "commonjs",
    },
    devtool: "source-map",
    resolve: {
        extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: "ts-loader",
            },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
        ],
    },
    optimization: {
        minimizer: [
            new UglifyWebpackPlugin({
                cache: true,
                parallel: true,
                uglifyOptions: {
                    mangle: true,
                },
                sourceMap: true,
            }),
        ],
    },
};
