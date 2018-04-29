import React, { Component } from 'react';
import { Card, List, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import _ from 'lodash';

import { Sections } from '../../../api/sections/sections.js';

class ClassPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teacher: props.teacher,
            sections : []
        }
    }

    componentWillReceiveProps(newProp) {
        if (newProp.sections.length != 0) {
            this.setState({ sections: newProp.sections });
        }
    }

    render() {
        const { teacher } = this.state;
        return (
            <Card>
                <Card.Content header='Classes' />
                <Card.Content>
                    <List divided verticalAlign='middle' selection animated>
                        {this.props.sections.length != 0 ?
                            this.state.sections.map((section) => 
                                <List.Item key={section._id}>
                                    <List.Content floated='right'>
                                        <List.Header>{section.code}</List.Header>
                                    </List.Content>
                                    <List.Content>
                                        <List.Header>{section.subject} - {section.sectionName}</List.Header>
                                    </List.Content>
                                </List.Item>
                            ) : <Loader active inline='centered' /> }    
                        
                    </List>
                </Card.Content>
            </Card>
        )

    }
}

ClassPanel.protoTypes = {
    callback: PropTypes.func,
}

export default withTracker((props) => {
    Meteor.subscribe('sections');

    return {
        sections: Sections.find({ isDeleted: false, teacherList: props.teacher._id }, { sort: { createdAt: -1 } }).fetch(),
    }
})(ClassPanel);