import React, { Component } from 'react';
import Header from '../components/common/header';

export default class AdminTeachers extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id='adminTeachers'>
                <Header active="teachers"/>
                <p> this is teachers </p>
            </div>
        );
    }
};