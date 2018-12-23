const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    devtool: 'source-map',
    entry: './src/main.js',
    output: {
        filename: './bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"
            },
            {
                test: /\.css$/,
                use: [
                  MiniCssExtractPlugin.loader,
                  { loader: 'css-loader', options: { modules: true, camelCase: true } }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles/[name].[chunkhash:8].css',
            chunkFilename: 'styles/[name].[chunkhash:8].css'
        }),
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: './index.html'
        })
    ]
};
