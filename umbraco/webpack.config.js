const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const RemovePlugin = require('remove-files-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        "main": "./src/js/index",
        "modules": "./src/js/modules"
    },
    output: {
        path: path.resolve(__dirname, 'assets'),
        filename: 'js/[name].[contenthash].js'
    },
    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: "css-loader", options: { url: false, sourceMap: true } },
                    { loader: "sass-loader", options: { sourceMap: true } },
                    "sass-bulk-import-loader"
                ],
            },
        ],
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    chunks: "initial",
                },
            },
        },
        minimizer: [
            new CssMinimizerPlugin({
                minimizerOptions: {
                    preset: [
                        "default",
                        {
                            discardComments: {
                                removeAll: true
                            },
                        },
                    ],
                },
            }),
            new TerserPlugin({
                terserOptions: {
                    format: {
                        comments: false,
                    },
                },
                extractComments: false
            }),
            new AssetsPlugin({
                filename: 'assets.json',
                path: path.resolve(__dirname, 'assets'),
                prettyPrint: true,
                removeFullPathAutoPrefix: true,
            }),
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/[name].[contenthash].css",
            chunkFilename: "css/[id].css"
        }),
        new RemovePlugin({
            before: {
                include: [
                    './assets/css',
                    './assets/js'
                ]
            },
        }),
    ],
};
