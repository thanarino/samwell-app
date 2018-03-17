import React, { Component } from 'react';
import { Header, Sticky, Label, Button, Grid, Icon, Table } from 'semantic-ui-react';
import DeleteClassModal from './deleteClassModal';
import EditClassModal from './editClassModal';

NoneSelected = (props) => {
    return <Sticky>
        < Header as='h1' textAlign='center' icon>
            <Icon name='pointing left' />
            First select a section in the list on the left.
        </Header >
    </Sticky>;
} 

SectionSelected = (props) => {
    const section = props.section;
    return <Sticky>
        <Header as='h1' textAlign='center'>
            <Header.Content>{section.subject} - {section.sectionName}</Header.Content>
            <Header.Subheader>{section.description}</Header.Subheader>
        </Header>
        <Grid centered columns={2} >
            <Grid.Column>
                <Button.Group widths={2}>
                    <EditClassModal section={props.section}/>
                    <DeleteClassModal section={props.section}/>
                </Button.Group>
            </Grid.Column>
        </Grid>
        <Table definition>
            <Table.Body>
                <Table.Row>
                    <Table.Cell>ID</Table.Cell>
                    <Table.Cell>{section._id}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>Class Type</Table.Cell>
                    <Table.Cell>{section.classType}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>Year and Semester</Table.Cell>
                    <Table.Cell>{section.year} - {section.semester === 'First' || section.semester === 'Second' ? section.semester + ' Semester' : section.semester}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>Room</Table.Cell>
                    <Table.Cell>{section.room}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>Days</Table.Cell>
                    <Table.Cell>{section.daysList}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>Start Time</Table.Cell>
                    <Table.Cell>{section.startTime}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>End Time</Table.Cell>
                    <Table.Cell>{section.endTime}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>Teachers</Table.Cell>
                    <Table.Cell>{section.teacherList}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>Students</Table.Cell>
                    <Table.Cell>{section.studentList}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>Archived</Table.Cell>
                    <Table.Cell>{section.isDeleted.toString()}</Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table>
    </Sticky>;
}

PanelBuilder = (props) => {
    const section = props.section;
    if (section) {
        return <SectionSelected section={section}/>
    } else {
        return <NoneSelected/>
    }
} 

export default class InfoPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const section = this.props.section;
        return (
            <PanelBuilder section={section}/>
        )
    }
}
