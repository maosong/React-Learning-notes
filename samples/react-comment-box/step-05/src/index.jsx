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

ReactDOM.render(
    <CommentBox url="data.json" pollInterval={2000}/>, document.getElementById('myApp'));
