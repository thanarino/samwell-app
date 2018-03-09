import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import Header from '../components/common/header';
import ClassList from '../components/adminClasses/list';

export default class AdminClasses extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id='adminClasses'>
                <Header active='classes'/>
                <Grid columns={2} divided padded>
                    <Grid.Row>
                        <Grid.Column>
                            <ClassList />
                        </Grid.Column>
                        <Grid.Column>
                            <p> this is classes </p>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>    
            </div>
        );
    }
};