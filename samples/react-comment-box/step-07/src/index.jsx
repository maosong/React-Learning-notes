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

        this.props.onCommentSubmit({
            id: Date.now(),
            poster: poster,
            content: content
        });

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

ReactDOM.render(
    <CommentBox url="data.json" urlPost="data.php" pollInterval={2000}/>, document.getElementById('myApp'));
