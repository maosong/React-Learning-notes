# React - Hello World!

我使用React的`组件`和`jsx`语法创建了经典的`Hello World!`，并通过之前的知识点`nvm`、`babel`和`webpack`进行项目创建、编译和构建，通过`webpack-dev-server`进行项目开发。

[查看本文演示代码](samples/react-hello-world)

## 创建项目

创建`react-hello-world`文件夹，并使用`npm init`初始化。（假设已经创建好[nvm](nvm.md)环境）

```sh
$ mkdir react-hello-world
$ cd react-hello-world
$ npm init
```

## 安装依赖包

我们需要`Bable`将ES6代码编译为ES5，需要`Webpack`和相关插件进行代码打包优化，当然最重要的`React`库。

```sh
# babel相关
$ cnpm install --save-dev babel-cli
$ cnpm install --save-dev babel-loader
$ cnpm install --save-dev babel-preset-es2015
$ cnpm install --save-dev babel-preset-react
$ cnpm install --save-dev babel-preset-stage-2

# webpack相关
$ cnpm install --save-dev webpack
$ cnpm install --save-dev webpack-dev-server

# react相关
$ cnpm install --save-dev react
$ cnpm install --save-dev react-dom
```

## 创建项目文件

### 1. 首页

```html
<!-- index.html -->

<html>

<head>
    <meta charset="UTF-8">
    <title>React Hello World!</title>
</head>

<body>
    <div id="myApp"></div>
    <!-- dist/index.js 是webpack打包结果 -->
    <script src="dist/index.js"></script>
</body>

</html>
```

### 2. 主入口

```javascript
// src/index.jsx

import React from 'react';
import ReactDOM from 'react-dom';

import HelloWorld from './HelloWorld.jsx';

ReactDOM.render(
    <HelloWorld/>, document.getElementById('myApp'))
```

## 3. HelloWorld 组件

我们通过扩展`React.Component`创建自定义组件`HelloWorld`。

> ⚠️ 注意：`react`组件只能有一个顶层元素

```javascript
// src/HelloWorld.jsx

import React from 'react';

class HelloWorld extends React.Component {
    render() {
        return (
            <div className="HelloWorld">
                Hello World!
            </div>
        );
    }
}

export default HelloWorld;
```

## 4. Webpack 配置文件

```javascript
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
        //使用bable编译js(x)文件
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
```

## 打包编译项目

因为webpack是通过save-dev安装的，所以我们要使用相对路径执行。

```sh
$ node_modules/.bin/webpack
```

index.jsx和它引用的组件全部编译到dist/index.js，现在通过浏览器打开index.html看看效果吧。

对于大型项目webpack支持监听模式增量编译，对开发极为方便

```sh
$ node_modules/.bin/webpack --watch
```

当然，使用之前安装的 `webpack-dev-server` 开发服务器是一个更好的选择。

```sh
$ node_modules/.bin/webpack-dev-server
# or
$ node_modules/.bin/webpack-dev-server --watch
```

用浏览器打开 `http://127.0.0.1:7777` 即可查看效果，通过 `http://127.0.0.1:7777/webpack-dev-server/index.html` 还可以实现增量编译自动刷新功能。
