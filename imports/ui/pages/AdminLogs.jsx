import React, { Component } from 'react';
import SiteHeader from '../components/common/header';

export default class AdminLogs extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id='adminLogs'>
                <SiteHeader active="logs" teacher={null}/>
                <p> this is logs </p>
            </div>
        );
    }
};