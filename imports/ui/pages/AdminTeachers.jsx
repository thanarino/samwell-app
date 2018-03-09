import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import Header from '../components/common/header';
import TeacherList from '../components/adminTeachers/list';

export default class AdminTeachers extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id='adminTeachers'>
                <Header active="teachers"/>
                <Grid columns={2} divided padded> 
                    <Grid.Row>
                        <Grid.Column>
                            <TeacherList/>
                        </Grid.Column>
                        <Grid.Column>
                            <p> this is teachers </p>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>    
            </div>
        );
    }
};