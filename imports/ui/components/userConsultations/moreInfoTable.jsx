import React, { Component } from 'react';
import { Grid, Label, Header, Icon, Button, Table, Popup, Checkbox } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import _ from 'lodash';
import moment from 'moment';

import { Consultations } from '../../../api/consultations/consultations';
import { Sections } from '../../../api/sections/sections';

class MoreInfoTable extends Component {
    static propTypes = {
        teacher: PropTypes.object,
    }

    constructor(props) {
        super(props);

        this.state = {
            teacher: props.teacher,
        }
    }

    toggle = (consultation) => {
        Meteor.call('consultations.teacherApprove', consultation._id, !consultation.isApprovedByTeacher);
    }

    render() {
        const { consultations, students, sections } = this.props;
        return (
            <div>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Section</Table.HeaderCell>
                            <Table.HeaderCell>Student</Table.HeaderCell>
                            <Table.HeaderCell>Start Time</Table.HeaderCell>
                            <Table.HeaderCell>End Time</Table.HeaderCell>
                            <Table.HeaderCell>Date</Table.HeaderCell>
                            <Popup trigger={<Table.HeaderCell>Student</Table.HeaderCell>}>
                                <Popup.Content>
                                    Student agreed to this consultation?
                                </Popup.Content>
                            </Popup>
                            <Popup trigger={<Table.HeaderCell>You</Table.HeaderCell>}>
                                <Popup.Content>
                                    You agreed to this consultation?
                                </Popup.Content>
                            </Popup>
                            <Table.HeaderCell>isDone</Table.HeaderCell>

                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {consultations.map((consultation, index) => {
                            const currentSection = _.filter(sections, { '_id': consultation.sectionID })[0];
                            const currentStudent = _.filter(students, { '_id': consultation.studentID })[0];
                            return <Table.Row key={consultation._id}>
                                <Table.Cell>{`${currentSection.subject} - ${currentSection.sectionName}`}</Table.Cell>
                                <Table.Cell>{`${currentStudent.family_name}, ${currentStudent.given_name}`}</Table.Cell>
                                <Table.Cell>{moment(consultation.startTime, 'hh:mm').format('hh:mm A')}</Table.Cell>
                                <Table.Cell>{moment(consultation.endTime, 'hh:mm').format('hh:mm A')}</Table.Cell>
                                <Table.Cell>{moment().dayOfYear(consultation.date).set({ 'year': consultation.year }).format("dddd, MMMM Do YYYY")}</Table.Cell>
                                <Table.Cell>{consultation.isApprovedByStudent ? <Icon name='check' /> : <Icon name='x' />}</Table.Cell>
                                <Table.Cell><Checkbox checked={consultation.isApprovedByTeacher} onChange={this.toggle(consultation)}/></Table.Cell>
                                <Table.Cell>{consultation.isDone ? <Icon name='check' /> : <Icon name='x' />}</Table.Cell>
                            </Table.Row>
                        }
                        )}
                    </Table.Body>
                </Table>
            </div>
        )
    }
}

MoreInfoTable.protoTypes = {
    callback: PropTypes.func,
}

export default withTracker((props) => {
    Meteor.subscribe('consultations');
    Meteor.subscribe('studentsAll');
    Meteor.subscribe('sections');

    return {
        consultations: Consultations.find({ teacherID: props.teacher._id }, { sort: { createdAt: -1 } }).fetch(),
        students: Meteor.users.find({ roles: 'student' }, { sort: { createdAt: -1 } }).fetch(),
        sections: Sections.find({ isDeleted: false }, { sort: { createdAt: -1 } }).fetch()
    }
})(MoreInfoTable);