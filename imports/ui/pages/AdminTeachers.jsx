import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import Header from '../components/common/header';

import TeacherList from '../components/adminTeachers/list';
import TeacherInfoPanel from '../components/adminTeachers/infopanel';

export default class AdminTeachers extends Component {
    constructor(props) {
        super(props);
        this.state = { teacher: null };
    }

    getTeacher = (teacher) => this.setState({ teacher });

    render() {
        return (
            <div id='adminTeachers'>
                <Header active="teachers"/>
                <Grid columns={2} divided padded> 
                    <Grid.Row>
                        <Grid.Column>
                            <TeacherList callback={this.getTeacher.bind(this)}/>
                        </Grid.Column>
                        <Grid.Column>
                            <TeacherInfoPanel teacher={this.state.teacher} />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>    
            </div>
        );
    }
};