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
