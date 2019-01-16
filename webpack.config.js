const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry: path.resolve(__dirname, "src/index.ts"),
    output: {
        path: path.resolve(__dirname, "./lib"),
        filename: "index.js",
        library: "",
        libraryTarget: "commonjs",
    },
    resolve: {
        extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: ["babel-loader", "ts-loader"],
            },
        ],
    },
};
