import React, { Component } from 'react';
import Header from '../components/common/header';

export default class AdminLogs extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id='adminLogs'>
                <Header active="logs"/>
                <p> this is logs </p>
            </div>
        );
    }
};