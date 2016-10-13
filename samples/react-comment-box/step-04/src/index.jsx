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
