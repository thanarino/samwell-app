import React, { Component } from 'react';
import { Card, List, Loader, Button, Icon, Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import moment from 'moment';
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
            students: [],
        }
    }

    componentWillReceiveProps(newProp) {
        if (newProp.sections.length > 0 || newProp.students.length > 0) {
            this.setState({ sections: newProp.sections, students: newProp.students });
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
                            <Card.Content header={`${this.state.activeSection.subject} - ${this.state.activeSection.sectionName} Information`} />
                            <Card.Content>
                                <Table definition>
                                    <Table.Body>
                                        <Table.Row>
                                            <Table.Cell>Course Title</Table.Cell>
                                            <Table.Cell>{this.state.activeSection.description}</Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell>Class Type</Table.Cell>
                                            <Table.Cell>{this.state.activeSection.classType}</Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell>Room</Table.Cell>
                                            <Table.Cell>{this.state.activeSection.room}</Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell>Schedule</Table.Cell>
                                            <Table.Cell>{`${moment(this.state.activeSection.startTime, 'hh:mm').format('hh:mm A')} to ${moment(this.state.activeSection.endTime, 'hh:mm').format('hh:mm A')} on ${this.state.activeSection.daysList.map((day, index) => { if (index == 0) return `${day}s`; else if (index == this.state.activeSection.daysList.length-1) return ` and ${day}s`; else return ` ,${day}s` })}`}</Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell>Semester</Table.Cell>
                                            <Table.Cell>{this.state.activeSection.semester.value === 'First' || this.state.activeSection.semester.value === 'Second' ? this.state.activeSection.semester.value + ' Semester' : this.state.activeSection.semester.value}</Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell>Start of Class</Table.Cell>
                                            <Table.Cell>{moment().dayOfYear(this.state.activeSection.semester.start).set({'year': this.state.activeSection.semester.startYear}).format('dddd, MMMM Do YYYY')}</Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell>End of Class</Table.Cell>
                                            <Table.Cell>{moment().dayOfYear(this.state.activeSection.semester.end).set({'year': this.state.activeSection.semester.endYear}).format('dddd, MMMM Do YYYY')}</Table.Cell>
                                        </Table.Row>
                                    </Table.Body>
                                </Table>
                            </Card.Content>
                        </Card>
                        {this.state.students.length != 0 ?
                            <Card fluid>
                                <Card.Content header={`Students from ${this.state.activeSection.subject} - ${this.state.activeSection.sectionName}`} />
                                <Card.Content>
                                    {this.state.activeSection.studentList.length != 0 ?
                                        <List divided verticalAlign='middle' selection animated size='large'>
                                            {this.state.activeSection.studentList.map((student, index) =>{
                                                let studentFound = _.filter(students, { '_id': student })[0];
                                                return <List.Item key={index}>
                                                    <List.Content floated='right'>
                                                        <Button icon labelPosition='left'>
                                                            <Icon name='x' />
                                                            Remove
                                                    </Button>
                                                    </List.Content>
                                                    <List.Content verticalAlign='middle'>
                                                        <List.Header verticalAlign='middle'>{`${studentFound.family_name}, ${studentFound.given_name}`}</List.Header>
                                                    </List.Content>
                                                </List.Item>
                                            }
                                            )}
                                        </List> : "There are no students in the class."}
                                </Card.Content>
                            </Card>    
                            : <Loader active inline='centered' /> }
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
    Meteor.subscribe('studentsAll');

    return {
        sections: Sections.find({ isDeleted: false, teacherList: props.teacher._id }, { sort: { createdAt: -1 } }).fetch(),
        students: Meteor.users.find({ roles: 'student' }, { sort: { createdAt: -1 } }).fetch(),
    }
})(ClassPanel);