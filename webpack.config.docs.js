const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './docs/index.jsx',
    output: {
        path: path.resolve(__dirname, 'docs/build/'),
        filename: 'index.js'
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                //include: path.resolve(__dirname, 'docs'),
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react']
                }
            }
        ]
    }
};
