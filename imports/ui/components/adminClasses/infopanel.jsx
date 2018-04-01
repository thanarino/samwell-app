import React, { Component } from 'react';
import { Header, Sticky, Label, Button, Grid, Icon, Table } from 'semantic-ui-react';
import moment from 'moment';
import DeleteClassModal from './deleteClassModal';
import EditClassModal from './editClassModal';

NoSectionSelected = (props) => {
    return <Sticky>
        < Header as='h1' textAlign='center' icon>
            <Icon name='pointing left' />
            First select a section in the list on the left.
        </Header >
    </Sticky>;
} 

SectionSelected = (props) => {
    const section = props.section;
    return <div className='scrollable'>
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
                    <Table.Cell>Semester</Table.Cell>
                    <Table.Cell>{section.semester.value === 'First' || section.semester.value === 'Second' ? section.semester.value + ' Semester' : section.semester.value}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>Semester Start</Table.Cell>
                    <Table.Cell>{`${moment().dayOfYear(section.semester.start).format('MMMM DD')}, ${section.semester.startYear}`}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>Semester End</Table.Cell>
                    <Table.Cell>{`${moment().dayOfYear(section.semester.end).format('MMMM DD')}, ${section.semester.endYear}`}</Table.Cell>
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
                    <Table.Cell>{moment(section.startTime,'hh:mm').format('hh:mma')}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>End Time</Table.Cell>
                    <Table.Cell>{moment(section.endTime, 'hh:mm').format('hh:mma')}</Table.Cell>
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
    </div>;
}

SectionPanelBuilder = (props) => {
    const section = props.section;
    if (section) {
        return <SectionSelected section={section}/>
    } else {
        return <NoSectionSelected/>
    }
} 

export default class SectionInfoPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const section = this.props.section;
        return (
            <SectionPanelBuilder section={section}/>
        )
    }
}
