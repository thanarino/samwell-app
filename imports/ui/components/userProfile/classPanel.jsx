import React, { Component } from 'react';
import { Card, List, Loader, Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import _ from 'lodash';

import { Sections } from '../../../api/sections/sections.js';

class ClassPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teacher: props.teacher,
            sections: [],
            activeSection: null,
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
            <div>
                <Card fluid>
                    <Card.Content header='Classes' />
                    <Card.Content>
                        <List divided verticalAlign='middle' selection animated size='large'>
                            {this.props.sections.length != 0 ?
                                this.state.sections.map((section) => 
                                    <List.Item key={section._id} onClick={()=>this.setState({activeSection: section})}>
                                        <List.Content floated='right'>
                                            <Button icon labelPosition='left'>
                                                <Icon name='send outline' />
                                                Message
                                            </Button>
                                        </List.Content>    
                                        <List.Content floated='right' verticalAlign='middle'> 
                                            <List.Header verticalAlign='middle'>{section.code}</List.Header>
                                        </List.Content>
                                        <List.Content verticalAlign='middle'>
                                            <List.Header verticalAlign='middle'>{section.subject} - {section.sectionName}</List.Header>
                                        </List.Content>
                                    </List.Item>
                                ) : <Loader active inline='centered' /> }
                            
                        </List>
                    </Card.Content>
                </Card>
                {this.state.activeSection ? 
                    <Card fluid>
                        <Card.Content header='Classes' />
                        <Card.Content>
                            {this.state.activeSection.studentList.length != 0 ?
                            <List divided verticalAlign='middle' selection animated size='large'>
                                    {this.state.activeSection.studentList.map((student, index) =>
                                        <List.Item key={index}>
                                            <List.Content floated='right'>
                                                <Button icon labelPosition='left'>
                                                    <Icon name='x' />
                                                    Remove
                                                </Button>
                                            </List.Content>
                                            <List.Content verticalAlign='middle'>
                                                <List.Header verticalAlign='middle'>{student}</List.Header>
                                            </List.Content>
                                        </List.Item>
                                    )}
                            </List> : "There are no students in the class."}
                        </Card.Content>
                    </Card> : null}
            </div>    
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