# 转码器Babel

Babel是一个广泛使用的转码器，可以将ES6代码转为ES5代码，从而在现有环境执行。

这意味着，你可以现在就用ES6编写程序，而不用担心现有环境是否支持。下面是一个例子。

```JavaScript
// 转码前
input.map(item => item + 1);

// 转码后
input.map(function (item) {
  return item + 1;
});
```

（上文摘自阮一峰的[Babel 入门教程](http://www.ruanyifeng.com/blog/2016/01/babel.html)）

强烈建议阅读本文前，首先阅读：

- [Babel 入门教程](http://www.ruanyifeng.com/blog/2016/01/babel.html)

## 如何使用Babel

### 1. 创建项目

```sh
$ mkdir project
$ cd project
$ cnpm init
```

### 2. 安装转码器和转码规则

```sh
#全局安装babel转码器
$ cnpm install --global babel-cli
$ babel --help

# or

#本项目安装babel转码器
$ cnpm install --save-dev babel-cli
$ ./node_modules/.bin/babel

# 转码规则
$ cnpm install --save-dev babel-preset-es2015 #本项目安装es2015转码规则
$ cnpm install --save-dev babel-preset-react #本项目安装react转码规则
$ cnpm install --save-dev babel-preset-stage-2 #本项目安装ES7阶段2提案，还有0/1/3等阶段提案
```

### 3. 创建配置文件

```sh
$ vi .babelrc
```

```JavaScript
{
  "presets": [
    "es2015",
    "react",
    "stage-2"
  ],
  "plugins": []
}
```

```sh
$ vi package.json
```

```JavaScript
{
  // ...
  "scripts": {
    "build": "babel src -d build"
  },
  // ...
}
```

### 4. 创建演示代码

```sh
$ mkdir src build
$ vi src/example.js
```

```JavaScript
input.map(item => item + 1);
```

### 5. 开始转码

```sh
$ npm run build
```

**也可以手动调用babel转码**

```sh
# 转码结果输出到标准输出
$ babel src/example.js
# or
$ ./node_modules/.bin/babel src/example.js

# 转码一个文件
$ babel src/example.js -o build/example.js
# or
$ ./node_modules/.bin/babel src/example.js -o build/example.js

# 整个目录转码，-s参数生成source map文件
$ babel src -d build -s
# or
$ ./node_modules/.bin/babel src -d build -s
```
