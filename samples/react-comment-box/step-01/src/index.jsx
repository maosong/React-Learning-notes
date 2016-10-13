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
