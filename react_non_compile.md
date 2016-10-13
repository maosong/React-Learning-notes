# 不使用NPM快速实现 Hello World!

这里我们不使用npm快速实现`Hello World!`。为实现这个目标我们需要引入`browser.js`库，它允许浏览器直接运行ES6代码，原理是实时编译type为`text/babel`的script标签，因此性能影响巨大，同时未压缩版本在1M左右，目前只适合开发环境使用。

我选用[七牛开放静态文件CDN](http://www.staticfile.org)作为本次的静态资源提供商。

[查看本文演示代码](samples/react-non-compile)

## 创建项目

```sh
$ mkdir react-non-compile
$ cd react-non-compile
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
    <script src="https://staticfile.qnssl.com/react/0.14.3/react.min.js"></script>
    <script src="https://staticfile.qnssl.com/react/0.14.3/react-dom.min.js"></script>
    <script src="https://staticfile.qnssl.com/babel-core/5.8.34/browser.min.js"></script>
    <script type="text/babel" src="src/index.jsx"></script>
</body>

</html>
```

### 2. 主入口

```JavaScript
// src/index.jsx

class HelloWorld extends React.Component {
    render() {
        return (
            <div className="HelloWorld">
                Hello World!
            </div>
        );
    }
}

ReactDOM.render(
    <HelloWorld/>, document.getElementById('myApp'))
```

现在通过浏览器打开index.html看看效果吧。
