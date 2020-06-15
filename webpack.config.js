const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        main: ["@babel/polyfill", "./src/js/index"],
        print: ["./src/scss/print.scss"]
    },
    devServer: {
        publicPath: '/assets/',
        watchContentBase: true
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ["@babel/plugin-transform-classes"]
                    }
                },
                exclude: /node_modules\/(?!(swiper|dom7)\/).*/
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader", options: {
                            sourceMap: true
                        },
                    },
                    {
                        loader: "postcss-loader", options: {
                            sourceMap: true
                        },
                    },
                    {
                        loader: "sass-loader", options: {
                            sourceMap: true
                        }
                    },
                    "sass-bulk-import-loader"
                ]
            }
        ]
    },
    optimization: {
        minimizer: [
            new OptimizeCssAssetsPlugin({}),
            new TerserPlugin({
                terserOptions: {
                    output: {
                        comments: false
                    },
                }
            })
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "./css/[name].min.css"
        })
    ],
    output: {
        filename: './js/[name].min.js',
        chunkFilename: './js/[name].min.js',
        path: path.resolve(__dirname, 'assets'),
        publicPath: '/assets/'
    }
};