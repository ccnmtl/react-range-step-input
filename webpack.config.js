const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './lib/index.js',
    output: {
        path: path.resolve(__dirname, 'build/'),
        filename: 'index.js',
        libraryTarget: 'commonjs'
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: path.resolve(__dirname, 'lib'),
                exclude: /node_modules/,
                loader: 'babel-loader',
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            }
        ]
    }
};
