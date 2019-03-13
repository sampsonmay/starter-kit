const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");

const smp = new SpeedMeasurePlugin();

module.exports = smp.wrap({
    mode: 'development',
    entry: './src/js/index',
    devServer: {
        publicPath: '/assets/',
        watchContentBase: true
    },
    module: {
        rules: [{
            test: /\.scss$/,
            use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader", "sass-bulk-import-loader"]
        }]
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
});