# 评论框组件

现在我要进一步深入React的组件，涉及模块化、可组装的组件、组件状态初始化和更新、增量渲染、远程请求数据等知识点。React可以让我们优雅地进行迭代开发，逐步完善评论框的功能。

我选用[七牛开放静态文件CDN](http://www.staticfile.org)作为本次的静态资源提供商。

本文演示代码：[PHP版](samples/react-comment-box) [Node.js版](samples/react-comment-box-nodejs)

## 组件结构设计

React 中都是关于模块化、可组装的组件。以我们的评论框为例，我们将有如下的组件结构：

```
- CommentBox `容器`
  - CommentList `评论列表`
    - Comment `评论`
  - CommentForm `post表单`
```

在下文中我将逐步扩充他们的代码，并进行组装，完成最终版本。

## 第一步：创建项目

首先创建`react-comment-box`文件夹作为项目文件夹。

```sh
$ mkdir react-comment-box
$ cd react-comment-box
```

创建index.html首页文件。

> 我们在这里引入 jQuery 是因为想简化 ajax 请求，但这对React的正常工作 `不是` 必要的。

```html
<!-- index.html -->

<html>

<head>
    <meta charset="UTF-8">
    <title>React Comment-Box</title>
</head>

<body>
    <div id="myApp"></div>
    <script src="https://staticfile.qnssl.com/react/0.14.3/react.min.js"></script>
    <script src="https://staticfile.qnssl.com/react/0.14.3/react-dom.min.js"></script>
    <script src="https://staticfile.qnssl.com/babel-core/5.8.34/browser.min.js"></script>
    <script src="https://staticfile.qnssl.com/jquery/2.2.1/jquery.min.js"></script>
    <script type="text/babel" src="src/index.jsx"></script>
</body>

</html>
```

下面让我们来创建CommentBox组件的初始版本，之后我们会把所有组件及启动代码放入到src/index.jsx

```javascript
// src/index.jsx

var CommentBox = React.createClass({
    render: function() {
        return (
            <div className="commentBox">
                <h1>所有评论</h1>
                这里显示本站所有评论
            </div>
        );
    }
});

ReactDOM.render(
    <CommentBox/>, document.getElementById('myApp'));
```

好的，至此我们完成了项目创建，也有了一个引导页面`index.html`，并且完成了CommentBox组件的初始版本。现在通过浏览器打开`index.html`看一下效果吧。

也许你会问这跟[Hello World!](react_non_compile.md)有什么不同？确实没有什么不同，无论多么复杂的React组件都是用类似方式创建的，下面我们就赋予它更强大的能力。

## 第二步：可组装的组件

现在我们将创建CommentList和CommentForm两个组件，并将它们组装到CommentBox中。

```javascript
// src/index.jsx

var CommentBox = React.createClass({
    render: function() {
        return (
            <div className="commentBox">
                <h1>所有评论</h1>
                <CommentList/>
                <CommentForm/>
            </div>
        );
    }
});

var CommentList = React.createClass({
    render: function() {
        return (
            <div className="commentList">
                这里显示本站所有评论
            </div>
        );
    }
});

var CommentForm = React.createClass({
    render: function() {
        return (
            <div className="commentForm">
                编写新评论
            </div>
        );
    }
});

ReactDOM.render(
    <CommentBox/>, document.getElementById('myApp'));
```

上面代码中，我们创建了CommentList和CommentForm两个React对象，并修改了CommentBox的代码将这两个对象组装进去。是不是特别简单？现在通过浏览器打开`index.html`看一下效果吧。

## 第三步：使用props传递数据

现在我们创建Comment组件，并展示从父组件CommentList传来的数据。我们通过`属性`来实现这一要求。属性可以通过`this.props`访问。因此我们需要对CommentList进行迭代。

```javascript
// src/index.jsx

var CommentList = React.createClass({
    render: function() {
        return (
            <div className="commentList">
                <Comment id="1" poster="John" content="第一次来这里"/>
                <Comment id="2" poster="David" content="你好！"/>
            </div>
        );
    }
});

var Comment = React.createClass({
    render: function() {
        return (
            <div data-id={this.props.id} className="comment">
                <h2 className="poster">
                    {this.props.poster}
                </h2>
                {this.props.content}
            </div>
        );
    }
});
```

我们在CommentList中插入两个Comment组件，并通过属性传递了`poster`和`content`，而Comment组件使用`this.props`对象获取了它们进行展示。让我们看一下`index.html`效果吧。

## 第四步：挂钩数据模型

截止到第三步，我们完成了在源代码中直接插入评论，现在我们需要通过定义一组 JSON 数组渲染到CommentList中，让我们继续迭代。

```javascript
// src/index.jsx

var CommentBox = React.createClass({
    render: function() {
        return (
            <div className="commentBox">
                <h1>所有评论</h1>
                <CommentList data={this.props.data}/>
                <CommentForm/>
            </div>
        );
    }
});

var CommentList = React.createClass({
    render: function() {
        var commentNodes = this.props.data.map(function(comment) {
            return (<Comment id={comment.id} poster={comment.poster} content={comment.content}/>);
        });
        return (
            <div className="commentList">
                {commentNodes}
            </div >
        );
    }
});

var data = [
    {
        id: 1,
        poster: 'John',
        content: '第一次来这里'
    }, {
        id: 2,
        poster: 'David',
        content: '你好！'
    }
];

ReactDOM.render(
    <CommentBox data={data}/>, document.getElementById('myApp'));
```

好的，可以看到我们定义了一组 JSON 数组`data`，并通过`data`属性传递给CommentBox，进一步传递给CommentList。CommentList对数据列表map，动态创建一组对应的Comment组件并展示。

## 第五步：从服务器动态获取数据

迄今为止,每个组件都继续它自己的props渲染一次，下面我们将使用实现从服务器动态获取数据，并且定时刷新数据。

props 是不可变的，它们从父级组件传来并被父级“拥有”。为了实现交互，我们给组件引进了可变的 state。this.state 是组件私有的，可以通过调用 this.setState() 改变它。每当state更新，组件就重新渲染自己。（React是增量渲染，因此性能非常高）

继续我们组件的迭代：

```javascript
// src/index.jsx

var CommentBox = React.createClass({
    getInitialState: function() {
        return {data: []};
    },
    componentDidMount: function() {
        this.loadCommentsFromServer();
        setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    },
    loadCommentsFromServer: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,

            success: function(data) {

                this.setState({data: data});

            }.bind(this),

            error: function(xhr, status, err) {

                console.error(this.props.url, status, err.toString());

            }.bind(this)
        });
    },
    render: function() {
        return (
            <div className="commentBox">
                <h1>所有评论</h1>
                <CommentList data={this.state.data}/>
                <CommentForm/>
            </div>
        );
    }
});

ReactDOM.render(
    <CommentBox url="data.json" pollInterval={2000}/>, document.getElementById('myApp'));
```

此外，我们还需要增加一个远程数据库文件 `data.json`

```javascript
[
    {
        "id": 1,
        "poster": "John",
        "content": "第一次来这里"
    }, {
        "id": 2,
        "poster": "David",
        "content": "你好！"
    }
]
```

在上面的代码中，我们通过React组件的`getInitialState`方法完成state初始化(该方法在组件生命周期里只执行一次)。

通过`生命周期`状态处理函数`componentDidMount`（在组件向浏览器插入真实dom后），引发`loadCommentsFromServer`方法加载远程数据，最后通过`setState`更新`state`引发组件重新渲染。

结合`setState`的特性，我们使用`setInterval`实现了简单的轮询。实际产品环境中，我们可以很轻松的调整为WebSockets或其他技术方案。

现在通过浏览器打开`index.html`并启用调试工具看一下实际效果吧。

## 第六步：构建发表评论表单

对于传统DOM，`input`元素被渲染并且浏览器管理它的状态(它的渲染值)，结果是DOM的实际值会和组件不同。这是不理想的，需要将统一它们。因此，我们将使用`this.state`和`dom事件`解决这个问题。

下面我们对CommentForm组件进行迭代：

```javascript
// src/index.jsx

var CommentForm = React.createClass({
    getInitialState: function() {
        return {poster: '', content: ''};
    },
    handleSubmit: function(e) {
        e.preventDefault();

        var poster = this.state.poster.trim();
        var content = this.state.content.trim();

        if (!poster || !content) {
            alert('请填写昵称或内容。');
            return;
        }

        // TODO: send request to the server

        this.setState({poster: '', content: ''});
    },
    handlePosterChange: function(e) {
        this.setState({poster: e.target.value});
    },
    handleContentChange: function(e) {
        this.setState({content: e.target.value});
    },
    render: function() {
        return (
            <form className="commentForm" onSubmit={this.handleSubmit}>
                <input type="text" placeholder="昵称" value={this.state.poster} onChange={this.handlePosterChange}/>
                <input type="text" placeholder="评论内容..." value={this.state.content} onChange={this.handleContentChange}/>
                <input type="submit" value="Post"/>
            </form>
        );
    }
});
```

至此，我们得到了一个不错的评论表单，具备简单的内容校验，而且用户输入会实时反映到组件数据中。

## 第七步：向服务器提交评论数据

现在我们需要一个后端程序来接收新评论，并且保存到数据库。你可以使用php、nodejs、python等任意一种后端语言，本文以php为例。

```sh
$ cd react-comment-box
$ php -S localhost:8080
```

我们使用php创建了一个简单的web服务器，现在通过浏览器打开http://localhost:8080即可访问`index.html`。

现在需要创建一个脚本文件，处理表单提交：

```PHP
<?php
// data.php

// json数据库文件路径
$basePath = __DIR__;
$dataFilepath = $basePath . '/data.json';

// 创建json数据库文件
if (!is_file($dataFilepath)) {
    file_put_contents($dataFilepath, json_encode([]));
}

// 载入原始数据
$dataRaw = file_get_contents($dataFilepath);

// 提交评论
if ($_SERVER['REQUEST_METHOD']=="POST") {
    // 组装新评论
    $data = json_decode($dataRaw);
    $data[] = [
        'id' => $_POST['id'],
        'poster' => $_POST['poster'],
        'content' => $_POST['content'],
    ];
    $dataRaw = json_encode($data);

    // 写入json数据库
    file_put_contents($dataFilepath, $dataRaw);
}

header('content-type:application/json;charset=utf8');
echo $dataRaw;
```

继续我们组件的迭代：

```javascript
// src/index.jsx

var CommentBox = React.createClass({
    //...
    handleCommentSubmit: function(comment) {
        $.ajax({
            url: this.props.urlPost,
            type: 'POST',
            data: comment,
            dataType: 'json',
            cache: false,

            success: function(data) {

                this.setState({data: data});

            }.bind(this),

            error: function(xhr, status, err) {

                console.error(this.props.url, status, err.toString());

            }.bind(this)
        });
    },
    render: function() {
        return (
            <div className="commentBox">
                <h1>所有评论</h1>
                <CommentList data={this.state.data}/>
                <CommentForm onCommentSubmit={this.handleCommentSubmit}/>
            </div>
        );
    }
});

var CommentForm = React.createClass({
    //...

    handleSubmit: function(e) {
        //...

        this.props.onCommentSubmit({
            id: Date.now(),
            poster: poster,
            content: content
        });

        //...
    },

    render: function() {
        return (
            <form className="commentForm" onSubmit={this.handleSubmit}>
                <input type="text" placeholder="昵称" value={this.state.poster} onChange={this.handlePosterChange}/>
                <input type="text" placeholder="评论内容..." value={this.state.content} onChange={this.handleContentChange}/>
                <input type="submit" value="Post"/>
            </form>
        );
    }
});

ReactDOM.render(
    <CommentBox url="data.json" urlPost="data.php" pollInterval={2000}/>, document.getElementById('myApp'));

```

我们为CommentForm创建了一个回调函数`this.props.onCommentSubmit`，通过对CommentBox的改造增加`handleCommentSubmit`方法支持了该回调，并通过urlPost属性配置表单提交的URL。表单提交成功后会引发组件重新渲染。

## 第八步：最终优化

我们组件的功能已经完备，但是在网速慢的情况下评论速度会非常糟糕。我们希望不必等待表单提交完成，用户即可看到自己的评论，这会让用户体验更佳。当然也要考虑到http请求失败的情况。

继续我们组件的迭代：

```javascript
var CommentBox = React.createClass({
    //...

    handleCommentSubmit: function(comment) {
        var comments = this.state.data;
        var newComments = comments.concat([comment]);
        this.setState({data: newComments});

        $.ajax({
            //...

            error: function(xhr, status, err) {

                this.setState({data: comments});
                console.error(this.props.url, status, err.toString());

            }.bind(this)
        });
    },

    //...
});
```

非常棒，我们只对CommentBox进行了简单的改造即达到预定目标，请求提交之前将现有数据和新数据合并，并渲染DOM。一旦请求失败使用旧数据重新渲染。
