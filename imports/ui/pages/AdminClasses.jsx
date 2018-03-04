import React, { Component } from 'react';
import Header from '../components/common/header';

export default class AdminClasses extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id='adminClasses'>
                <Header active='classes'/>
                <p> this is class </p>
            </div>
        );
    }
};