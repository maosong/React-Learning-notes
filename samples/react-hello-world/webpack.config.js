// webpack.config.js

var webpack = require('webpack');

var config = {
    //入口文件
    entry: ['./src/index.jsx'],

    //编译输出
    output: {
        path: './',
        filename: 'dist/index.js',
    },

    //插件
    plugins: [
        //js压缩
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false,
            },
        })
    ],

    //webpack-dev-server 开发服务器设置
    devServer: {
        inline: true,
        port: 7777
    },

    //模块
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /(node_modules)/,
            loader: 'babel',

            query: {
                presets: ['es2015', 'react', 'stage-2']
            }
        }]
    }

}

module.exports = config;
