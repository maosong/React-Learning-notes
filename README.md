# React 学习笔记

> React 起源于 Facebook 的内部项目，因为该公司对市场上所有 JavaScript MVC 框架，都不满意，就决定自己写一套，用来架设 Instagram 的网站。做出来以后，发现这套东西很好用，就在2013年5月开源了。
>
> 由于 React 的设计思想极其独特，属于革命性创新，性能出众，代码逻辑却非常简单。所以，越来越多的人开始关注和使用，认为它可能是将来 Web 开发的主流工具。 这个项目本身也越滚越大，从最早的UI引擎变成了一整套前后端通吃的 Web App 解决方案。衍生的 React Native 项目，目标更是宏伟，希望用写 Web App 的方式去写 Native App。如果能够实现，整个互联网行业都会被颠覆，因为同一组人只需要写一次 UI ，就能同时运行在服务器、浏览器和手机（参见[《也许，DOM 不是答案》](http://www.ruanyifeng.com/blog/2015/02/future-of-dom.html)）。
>
> 摘自：阮一峰的[React 入门实例教程](http://www.ruanyifeng.com/blog/2015/03/react.html)
>
> ⚠️ 注意！本文所有命令行仅在`centos 6.5`和`ubuntu 14`和`osx`下测试通过！

本文记录我在学习React过程中遇到的问题，解决方案，以及一步步如何搭建和部署React应用，涵盖nvm、babel、webpack、gulp等多个知识点。通过[在 2016 年学 JavaScript 是一种什么样的体验？](https://www.oschina.net/news/77853/how-about-learn-javascript-at-2016)可以让你了解现代前端开发结构。

编写本文之前我阅读过阮一峰的[ECMAScript 6入门](http://es6.ruanyifeng.com/)等文章，并编写了[ES6 学习不完全笔记](https://github.com/maosong/ES6-Learning-notes)，接触Node.js和ES6仅一周时间，它们与传统js开发差距巨大，因此本文难免会有各种疏漏或错误，敬请谅解，也希望指正。

## 目录

- [nvm - node版本管理工具](nvm.md)
- [Babel - 转码器](babel.md)
- [Webpack - 模块化管理和打包工具](webpack.md)
- [React - Hello World!](react_hello_world.md)
- [React - 评论框组件](react_comment_box.md)

## Q&A

- [React是否兼容IE8？](qa_react_ie8.md)
- [Webpack，Browserify和Gulp三者之间到底是怎样的关系？](qa_webpack_browserify_gulp.md)
- [React为何从0.14跨级到15.0？](qa_react_0.14_15.0.md)

## 文章资源

- [在 2016 年学 JavaScript 是一种什么样的体验？](https://www.oschina.net/news/77853/how-about-learn-javascript-at-2016)
- [使用 nvm 管理不同版本的 node 与 npm](http://www.tuicool.com/articles/Vzquy2)
- [使用nvm利器，管理node版本](http://www.cnblogs.com/kongxianghai/p/5660101.html)
- [Babel 入门教程](http://www.ruanyifeng.com/blog/2016/01/babel.html)
- [Webpack 中文指南](http://webpackdoc.com/index.html)
- [入门Webpack，看这篇就够了](http://www.jianshu.com/p/42e11515c10f)
- [webpack学习之路](https://github.com/wangning0/Autumn_Ning_Blog/blob/master/blogs/3-12/webpack.md)
- [一小时包教会 —— webpack 入门指南](http://www.w2bc.com/Article/50764)
- [深入 JSX](http://reactjs.cn/react/docs/jsx-in-depth-zh-CN.html)
- [React 入门实例教程](http://www.ruanyifeng.com/blog/2015/03/react.html)
- [React 安装](http://www.runoob.com/react/react-install.html)
- [深入理解React、Redux](http://www.jianshu.com/p/0e42799be566)
