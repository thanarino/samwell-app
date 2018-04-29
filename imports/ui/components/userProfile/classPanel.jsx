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
                    <div>
                        <Card fluid>
                            <Card.Content header={`${activeSection.subject} - ${activeSection.sectionName} Information`} />
                            <Card.Content>
                                <Table definition>
                                    <Table.Body>
                                        <Table.Row>
                                            <Table.Cell>Course Title</Table.Cell>
                                            <Table.Cell>{section.description}</Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell>Class Type</Table.Cell>
                                            <Table.Cell>{section.classType}</Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell>Room</Table.Cell>
                                            <Table.Cell>{section.room}</Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell>Schedule</Table.Cell>
                                            <Table.Cell>{`${moment(section.startTime, 'hh:mm').format('hh:mm A')} to ${moment(section.endTime, 'hh:mm').format('hh:mm A')} on ${section.daysList.map((day, index) => { if (index == 0) `${day}s`; else if (index == section.daysList.length) ` and ${day}s`; else ` ,${day}s` })}`}</Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell>Semester</Table.Cell>
                                            <Table.Cell>{section.semester.value === 'First' || section.semester.value === 'Second' ? section.semester.value + ' Semester' : section.semester.value}</Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell>Start of Class</Table.Cell>
                                            <Table.Cell>{moment().dayOfYear(section.semester.start).set({'year': section.semester.startYear}).format('dddd, MMMM Do YYYY')}</Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell>End of Class</Table.Cell>
                                            <Table.Cell>{moment().dayOfYear(section.semester.end).set({'year': section.semester.endYear}).format('dddd, MMMM Do YYYY')}</Table.Cell>
                                        </Table.Row>
                                    </Table.Body>
                                </Table>
                            </Card.Content>
                        </Card>
                        <Card fluid>
                            <Card.Content header={`Students from ${activeSection.subject} - ${activeSection.sectionName}`} />
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
                        </Card>
                    </div> : null}
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