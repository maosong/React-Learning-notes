# Webpack - 模块化管理和打包工具

> 以下是[Webpack 中文指南](http://webpackdoc.com/index.html)的开篇介绍

Webpack 是当下最热门的前端资源模块化管理和打包工具。它可以将许多松散的模块按照依赖和规则打包成符合生产环境部署的前端资源。还可以将按需加载的模块进行代码分隔，等到实际需要的时候再异步加载。通过 loader 的转换，任何形式的资源都可以视作模块，比如 CommonJs 模块、 AMD 模块、 ES6 模块、CSS、图片、 JSON、Coffeescript、 LESS 等。

## 如何使用Webpack

### 1. 创建项目

```sh
$ mkdir project
$ cd project
$ npm init
```

### 2. 安装Webpack和loader

```sh
$ cnpm install webpack --save-dev
$ cnpm install webpack-dev-server --save-dev
$ cnpm install css-loader style-loader --save-dev
```

### 3. 创建项目文件

```html
<!-- index.html -->
<html>
<head>
  <meta charset="utf-8">
</head>
<body>
  <script src="bundle.js"></script>
</body>
</html>
```

```JavaScript
// entry.js
require('./style.css') // 载入 style.css
document.write('It works.')
document.write(require('./module.js'))
```

```css
/* style.css */
body { background: yellow; }
```

```JavaScript
// module.js
module.exports = 'It works from module.js.'
```

### 4. 创建Webpack配置文件

```JavaScript
// webpack.config.js
var webpack = require('webpack')
module.exports = {
  watch: true,
  entry: './entry.js',
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {test: /\.css$/, loader: 'style!css'}
    ]
  },
  plugins: [
    //使用BannerPlugin插件添加首行注释
    new webpack.BannerPlugin('This file is created by maosong')
  ]
}
```

### 5. 打包编译并运行

首先通过webpack打包项目

```sh
$ node_modules/.bin/webpack
# or
$ node_modules/.bin/webpack --watch # 监听模式，增量编译
```

现在使用浏览器打开index.html看下效果吧。

当然，使用之前安装的 `webpack-dev-server` 开发服务器是一个更好的选择。它将在 localhost:8080 启动一个 express 静态资源 web 服务器，并且会以监听模式自动运行 webpack，在浏览器打开 http://localhost:8080/ 或 http://localhost:8080/webpack-dev-server/ 可以浏览项目中的页面和编译后的资源输出，并且通过一个 socket.io 服务实时监听它们的变化并自动刷新页面。

```sh
$ node_modules/.bin/webpack-dev-server
```
