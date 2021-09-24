const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: "./src/index",
    devServer: {
        static: {
          directory: path.join(__dirname, 'dist/'),
        },
        compress: true
    },
    output: {
        path: path.resolve(__dirname, './dist/assets/'),
        filename: './js/[name].[contenthash].js',
    },
    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: "css-loader", options: { sourceMap: true } },
                    { loader: "sass-loader", options: { sourceMap: true } },
                    "sass-bulk-import-loader"
                ],
            }
        ],
    },
    optimization: {
        minimizer: [new CssMinimizerPlugin()],
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: 'body',
            template: './src/index.html'
        }),
        // new CopyPlugin({
        //     patterns: [
        //         { from: "./src/assets/images", to: './images' },
        //         { from: "./src/assets/fonts", to: './fonts },
        //     ],
        // }),
        new MiniCssExtractPlugin({
            filename: "./css/[name].[contenthash].css"
        }),
        new TerserPlugin(),
    ],
};
