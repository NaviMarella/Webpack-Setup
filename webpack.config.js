const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname + '/dist'),
        filename: 'bundle.js'
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname + '/public/index.html')
        }),
        new ErrorOverlayPlugin()
    ],
    devServer: {
        stats: "errors-only",
        host: process.env.HOST, // Defaults to `localhost`
        port: process.env.PORT, // Defaults to 8080
        overlay: true,
        open: true, // Open the page in browser,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        }
    }
}