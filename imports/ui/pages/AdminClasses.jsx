import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import Header from '../components/common/header';
import PropTypes from 'prop-types';

import ClassList from '../components/adminClasses/list';
import SectionInfoPanel from '../components/adminClasses/infopanel';

export default class AdminClasses extends Component {
    constructor(props) {
        super(props);
        this.state = { section: null };
    }

    getSection = (section) => this.setState({ section });

    render() {
        const { section } = this.state;

        return (
            <div id='adminClasses'>
                <Header active='classes'/>
                <Grid columns={2} divided padded>
                    <Grid.Row>
                        <Grid.Column>
                            <ClassList callback={this.getSection.bind(this)}/>
                        </Grid.Column>
                        <Grid.Column>
                            <SectionInfoPanel section={this.state.section}/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>    
            </div>
        );
    }
};