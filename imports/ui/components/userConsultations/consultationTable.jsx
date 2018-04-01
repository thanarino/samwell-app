import React, { Component } from 'react';
import { Grid, Label, Header, Icon, Button, Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import _ from 'lodash';

import { Consultations } from '../../../api/consultations/consultations';

class ConsultationTable extends Component {
    static propTypes = {
        teacher: PropTypes.object,
    }

    constructor(props) {
        super(props);

        this.state = {
            teacher: props.teacher,
        }
    }

    render() {
        return (
            <div>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Subject</Table.HeaderCell>
                            <Table.HeaderCell>Section</Table.HeaderCell>
                            <Table.HeaderCell>Student</Table.HeaderCell>
                            <Table.HeaderCell>Start Time</Table.HeaderCell>
                            <Table.HeaderCell>End Time</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>Cell</Table.Cell>
                            <Table.Cell>Cell</Table.Cell>
                            <Table.Cell>Cell</Table.Cell>
                            <Table.Cell>Cell</Table.Cell>
                            <Table.Cell>Cell</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Cell</Table.Cell>
                            <Table.Cell>Cell</Table.Cell>
                            <Table.Cell>Cell</Table.Cell>
                            <Table.Cell>Cell</Table.Cell>
                            <Table.Cell>Cell</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Cell</Table.Cell>
                            <Table.Cell>Cell</Table.Cell>
                            <Table.Cell>Cell</Table.Cell>
                            <Table.Cell>Cell</Table.Cell>
                            <Table.Cell>Cell</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </div>
        )
    }
}

ConsultationTable.protoTypes = {
    callback: PropTypes.func,
}

export default withTracker((props) => {
    Meteor.subscribe('consultationsAll');

    return {
        consultations: Consultations.find({ teacherID: props.teacher._id }, { sort: { createdAt: -1 } }).fetch()
    }
})(ConsultationTable);