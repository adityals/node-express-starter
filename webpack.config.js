const nodeExternals = require('webpack-node-externals');
const path = require('path');

const config = {
    entry: './src/index.ts',
    target: 'node',
    externals: [nodeExternals()],
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist/'),
    },
    resolve: {
        modules: [path.resolve(__dirname, 'src/'), 'node_modules'],
        extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
        rules: [{ test: /\.(t|j)s$/, exclude: /node_modules/, loader: 'ts-loader' }],
    },
};

module.exports = config;
