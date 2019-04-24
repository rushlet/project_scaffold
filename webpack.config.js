console.log('I am webpack.');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { lstatSync, readdirSync } = require('fs');
const source = path.resolve(__dirname, 'src/components');
const isDirectory = source => lstatSync(source).isDirectory();
const dirs = readdirSync(source).map(name => path.join(source, name)).filter(isDirectory);
const debug = process.env.NODE_ENV !== "production";

module.exports = {
    entry: {
        app: [
            './src/app.js',
            './src/app.scss'
        ],
    },
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
                        partialDirs: [path.resolve(__dirname, 'src/'), ...dirs],
                    }
                }]
            },
            {
                test: /\.s?css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
                loader: 'url-loader?limit=100000'
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'index.hbs'),
            title: 'Webpack project set up', // needs updating with each project!
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
    ]
};
