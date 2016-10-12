# React - Hello World!

React 起源于 Facebook 的内部项目，因为该公司对市场上所有 JavaScript MVC 框架，都不满意，就决定自己写一套，用来架设 Instagram 的网站。做出来以后，发现这套东西很好用，就在2013年5月开源了。

由于 React 的设计思想极其独特，属于革命性创新，性能出众，代码逻辑却非常简单。所以，越来越多的人开始关注和使用，认为它可能是将来 Web 开发的主流工具。
这个项目本身也越滚越大，从最早的UI引擎变成了一整套前后端通吃的 Web App 解决方案。衍生的 React Native 项目，目标更是宏伟，希望用写 Web App 的方式去写 Native App。如果能够实现，整个互联网行业都会被颠覆，因为同一组人只需要写一次 UI ，就能同时运行在服务器、浏览器和手机（参见《也许，DOM 不是答案》）。

（上文摘自阮一峰的[React 入门实例教程](http://www.ruanyifeng.com/blog/2015/03/react.html)）

我使用React的`组件`和`jsx`语法创建了经典的`Hello World!`，并通过之前的知识点`nvm`、`babel`和`webpack`进行项目创建、编译和构建，通过`webpack-dev-server`进行项目开发。

## 创建项目

创建`react-hello-world`文件夹，并使用`npm init`初始化。

> 假设已经创建好[nvm](nvm.md)环境

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
