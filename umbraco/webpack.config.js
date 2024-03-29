const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const RemovePlugin = require('remove-files-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        "main": "./src/js/index",
        "modules": "./src/js/modules"
    },
    output: {
        path: path.resolve(__dirname, 'wwwroot/assets'),
        filename: 'js/[name].js',
        chunkFilename: 'js/[id].[chunkhash].js'
    },
    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: "css-loader", options: { url: false, sourceMap: false } },
                    { loader: "sass-loader", options: {
                            sourceMap: false,
                            sassOptions: {
                                includePaths: ["node_modules", "src/scss"],
                            }
                        }
                    }
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
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
            chunkFilename: "css/[id].css"
        }),
        new RemovePlugin({
            before: {
                include: [
                    'wwwroot/assets/css',
                    'wwwroot/assets/js'
                ]
            }
        }),
    ],
};
