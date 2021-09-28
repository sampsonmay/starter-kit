const path = require('path');
// const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const RemovePlugin = require('remove-files-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        "main": "./src/js/index",
        "modules": "./src/js/modules",
        "cms": "./src/js/cms"
    },
    output: {
        path: path.resolve(__dirname, './static/assets/'),
        filename: './js/[name].js',
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: "css-loader", options: { sourceMap: true } },
                    { loader: "sass-loader", options: { sourceMap: true } },
                    "sass-bulk-import-loader"
                ],
            },
            {
                test: /skin\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
              },
              {
                test: /content\.css$/i,
                use: ['css-loader'],
              },
        ],
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                tinymceVendor: {
                    test: /[\\/]node_modules[\\/](tinymce)[\\/]/,
                    name: "tinymce"
                },
                // common: {
                //     test: /[\\/]node_modules[\\/](!tinymce)[\\/]/,
                //     name: "vendor"
                // },
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
        ],
    },
    plugins: [
        // new CopyPlugin({
        //     patterns: [
        //         { from: "./src/assets/images", to: './images' },
        //         { from: "./src/assets/fonts", to: './fonts },
        //     ],
        // }),
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
            chunkFilename: "css/[id].css"
        }),
        new RemovePlugin({
            before: {
                include: [
                    './static/assets/css',
                    './static/assets/js'
                ]
            },
        }),
    ],
};
