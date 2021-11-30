const path = require('path');

const serverConfig = {
    target: 'node',
    mode: process.env.NODE_ENV || 'development',
    entry: './src/app/main.ts',
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        filename: 'server.js',
        path: path.resolve(__dirname, 'build'),
    },
};

const clientConfig = {
    target: 'web',
    mode: process.env.NODE_ENV || 'development',
    entry: './src/web/main.ts',
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'public'),
    },
};

module.exports = [serverConfig, clientConfig];