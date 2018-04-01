import React, { Component } from 'react';
import { Header, Sticky, Label, Button, Grid, Icon, Table, Image } from 'semantic-ui-react';

import default_pp from '../../res/default_pp.jpg';
import EditTeacherModal from './editTeacherModal';
import DeleteTeacherModal from './deleteTeacherModal';

NoTeacherSelected = (props) => {
    return <Sticky>
        < Header as='h1' textAlign='center' icon>
            <Icon name='pointing left' />
            First select a teacher in the list on the left.
        </Header >
    </Sticky>;
}

TeacherSelected = (props) => {
    const teacher = props.teacher;
    return <div className='scrollable'>
        <Header as='h1' textAlign='center'>
            <Image circular src={teacher.services.google ? teacher.services.google.picture : default_pp} />
            <Header.Content>{teacher.family_name && teacher.given_name ? `${teacher.family_name}, ${teacher.given_name}` : teacher.email}
                <Header.Subheader>{teacher.email}</Header.Subheader>
            </Header.Content>
        </Header>
        <Grid centered columns={2} >
            <Grid.Column>
                <Button.Group widths={2}>
                    <EditTeacherModal teacher={props.teacher} />
                    <DeleteTeacherModal teacher={props.teacher} />
                </Button.Group>
            </Grid.Column>
        </Grid>
        <Table definition>
            <Table.Body>
                <Table.Row>
                    <Table.Cell>ID</Table.Cell>
                    <Table.Cell>{teacher._id}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>First Name</Table.Cell>
                    <Table.Cell>{teacher.given_name ? teacher.given_name : "No data"}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>Middle Name</Table.Cell>
                    <Table.Cell>{teacher.middle_name ? teacher.middle_name : "No data"}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>Last Name</Table.Cell>
                    <Table.Cell>{teacher.family_name ? teacher.family_name : "No data"}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>Email</Table.Cell>
                    <Table.Cell>{teacher.email}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>Department</Table.Cell>
                    <Table.Cell>{teacher.department ? teacher.department : "No data"}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>Position</Table.Cell>
                    <Table.Cell>{teacher.position ? teacher.position : "No data"}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>Office</Table.Cell>
                    <Table.Cell>{teacher.office ? teacher.office : "No data"}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>Available</Table.Cell>
                    <Table.Cell>{teacher.available ? teacher.available.toString() : "No data"}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>Approved</Table.Cell>
                    <Table.Cell>{teacher.approved ? teacher.approved.toString() : "Not approved"}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>Classes</Table.Cell>
                    <Table.Cell>{teacher.classes? JSON.stringify(teacher.classes) : "No data"}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>Consultation Hours</Table.Cell>
                    <Table.Cell>{teacher.consultationHours ? JSON.stringify(teacher.consultationHours) : "No data"}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>Archived</Table.Cell>
                    <Table.Cell>{teacher.isDeleted.toString()}</Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table>
    </div>;
}

TeacherPanelBuilder = (props) => {
    const teacher = props.teacher;
    if (teacher) {
        return <TeacherSelected teacher={teacher} />
    } else {
        return <NoTeacherSelected/>
    }
}

export default class TeacherInfoPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const teacher = this.props.teacher;
        return (
            <TeacherPanelBuilder teacher={teacher}/>
        )
    }
}