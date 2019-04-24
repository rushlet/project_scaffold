console.log('I am webpack.');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: "./src/app.js",
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: "bundle.js"
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [
                    /node_modules/
                ],
                loader: 'babel-loader',
                query: {
                    presets: ['es2015'],
                },
            },
            {
                test: /\.hbs$/,
                use: [{
                    loader: 'handlebars-loader',
                    options: {
                        helperDirs: path.resolve(__dirname, 'src/components'),
                    }
                }]
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader", // creates style nodes from JS strings
                    "css-loader", // translates CSS into CommonJS
                    "sass-loader" // compiles Sass to CSS, using Node Sass by default
                ]
            }
       ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/app.hbs',
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ]
};
