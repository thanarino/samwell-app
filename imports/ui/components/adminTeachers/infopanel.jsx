import React, { Component } from 'react';
import { Header, Sticky, Label, Button, Grid, Icon, Table, Image } from 'semantic-ui-react';

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
    return <Sticky>
        <Header as='h1' textAlign='center'>
            <Image circular src={teacher.services.google.picture} />    
            <Header.Content>{teacher.family_name && teacher.given_name ? `${teacher.family_name}, ${teacher.given_name}` : teacher.email}
                <Header.Subheader>{teacher.email}</Header.Subheader>
            </Header.Content>
        </Header>
        <Grid centered columns={2} >
            <Grid.Column>
                {/* <Button.Group widths={2}>
                    <EditClassModal section={props.section} />
                    <DeleteClassModal section={props.section} />
                </Button.Group> */}
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
                    <Table.Cell>{teacher.given_name}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>Last Name</Table.Cell>
                    <Table.Cell>{teacher.family_name}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>Email</Table.Cell>
                    <Table.Cell>{teacher.email}</Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table>
    </Sticky>;
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