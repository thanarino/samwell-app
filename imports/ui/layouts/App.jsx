import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

export default class App extends Component {
    render() {
        return (
            <div className="container">
                {this.props.content}
            </div>  
        );
    }
}