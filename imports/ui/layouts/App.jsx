import React, { Component } from 'react';

export default class App extends Component {
    render() {
        return (
            <div className="container">
                {this.props.content}
            </div>  
        );
    }
}

// const App = (props) => {
//     return {props.content}
// }

// export default App;