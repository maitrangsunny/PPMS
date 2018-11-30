const path = require('path');
const webpack = require('webpack');
const prod = process.argv.indexOf('-p') !== -1;

const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const srcRoot = path.resolve(__dirname);
const publicRoot = path.resolve(srcRoot, 'public');
const appRoot = path.resolve(srcRoot, 'src');
const distRoot = path.resolve(srcRoot, 'dist');

module.exports = (env) => {

    const isDev = env == 'development';

    return {
        context: srcRoot,
        entry: {
            main: ["babel-polyfill", path.resolve('src/', 'index.js')],
            vendor: [
                'react', 'react-dom', 'jquery', 'moment',
                'react-bootstrap', 'lodash'
            ]
        },
        output: {
            path: distRoot,
            filename: isDev ? 'js/[name].bundle.js' : 'js/[name].[hash].bundle.js',
            sourceMapFilename: isDev ? 'js/[name].bundle.map' : 'js/[name].[chunkhash].bundle.map',
            chunkFilename: isDev ? 'js/[id].chunk.js' : 'js/[id].[chunkhash].chunk.js',
            publicPath: '/'
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,

                    loader: 'babel-loader',

                    query: {
                        "presets": [
                            ["env", { "modules": false }],
                            "stage-2",
                            "react"
                        ],
                        "plugins": [
                            "react-hot-loader/babel"
                        ]
                    },

                    exclude: [
                        /node_modules/,
                    ],
                },

                { test: /\.css$/, loader: "style-loader!css-loader!less-loader" },
                { test: /\.less$/, loader: "style!css!less" },
                { test: /\.json$/, loader: "json-loader" },

                {
                    test: /\.(jpe?g|png|gif)$/,
                    loader: 'file-loader',
                    query: {
                        name: 'assets/img/[name].[ext]'
                    }
                },
            ]

        },
        resolve: {
            extensions: [".js", ".jsx"],

            modules: [
                appRoot,
                'node_modules'
            ],
        },
        devServer: {
            historyApiFallback: true,
            contentBase: distRoot,
            contentBase: './',
            // host: "0.0.0.0",
            // port: 2300,
            // host: "ppms.vn",
            // port: 21,
            // hot: true,
            compress: true,
            publicPath: '/',
            stats: "minimal"

        },
        stats: "minimal",
        performance: {
            hints: false
        },
        devtool: isDev ? 'eval' : 'cheap-source-map',

        plugins: [
            new CleanWebpackPlugin(['dist']),
            new CopyWebpackPlugin([
                { from: './public/index.html' },
                { from: './public/assets', to: './assets' },

            ]),
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

            new HtmlWebpackPlugin({
                template: path.resolve(publicRoot, 'index.html'),
                chunksSortMode: 'dependency'
            }),

            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
                filename: 'js/[hash].vendor.js',

                minChunks: Infinity,
            }),

            new webpack.DefinePlugin({
                process: {
                    env: {
                        NODE_ENV: isDev ? '"development"' : '"production"'
                    }
                }
            }),

        ].concat(
            !isDev ?
                [
                    new webpack.optimize.UglifyJsPlugin({
                        compress: {
                            warnings: false
                        }
                    }),
                ]
                :
                []
        )
    }
};

