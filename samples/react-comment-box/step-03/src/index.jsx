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
