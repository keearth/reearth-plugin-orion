var webpack = require('webpack'),
    path = require('path'),
    { CleanWebpackPlugin } = require('clean-webpack-plugin'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    ZipPlugin = require('zip-webpack-plugin')

const ASSET_PATH = process.env.ASSET_PATH || '/';

module.exports = {
    mode: process.env.NODE_ENV || 'development',
    entry: {
        orion: './src/index.ts',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: ASSET_PATH
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
            },
        ],
    },
    resolve: {
        extensions: [
            '.ts', '.js',
        ],
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new CleanWebpackPlugin({
            verbose: true,
            cleanStaleWebpackAssets: true,
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'reearth.yml',
                    to: path.join(__dirname, 'dist'),
                    force: true,
                },
            ],
        }),
        new ZipPlugin({
            filename: 'reearth-plugin-orion.zip'
        })
    ]
};
