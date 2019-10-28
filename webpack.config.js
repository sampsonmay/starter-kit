const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: ["@babel/polyfill", "./src/js/index"],
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
            filename: "./css/style.css"
        })
    ],
    output: {
        filename: './js/bundle.js',
        path: path.resolve(__dirname, 'assets'),
        publicPath: '/assets/'
    }
};