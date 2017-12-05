'use strict';
const ENV = process.env.WEBPACK_ENV || 'dev';
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const RuntimeAnalyzerPlugin = require('webpack-runtime-analyzer');
const webpack = require('webpack');

console.log("\r\n\r\n ============================\r\n\r\n");
console.log(" Environment: " + ENV);
console.log("\r\n\r\n ============================\r\n\r\n");
module.exports = {
    entry: path.join(__dirname,'src/index.js'),
    output: {
        path: path.resolve(__dirname ,ENV !=='prod' ? 'dist':''),
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env'],
                    },
                },
            },
            {
                test: /\.html/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attrs: ['img:src','source:src']
                    }
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader',
                ]
            },
            {
                test: /\.(mp3)$/,
                use: [
                    'file-loader',
                ]
            },
        ]
    },
    plugins: [
     new htmlWebpackPlugin({
        template: path.join(__dirname,'src/index.html')
    }),
    new RuntimeAnalyzerPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
       name: 'common'
     }),
    ],
    devServer: {
      contentBase: path.resolve(__dirname ,'dist'),
    },
    devtool: "inline-cheap-module-source-map",
}
