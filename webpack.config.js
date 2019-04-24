console.log('I am webpack.');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
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
                        helperDirs: [path.resolve(__dirname, 'src/components'), path.resolve(__dirname, 'src')],
                    }
                }]
            },
            {
                test: /\.(scss|css)$/,
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader',
                ],
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
