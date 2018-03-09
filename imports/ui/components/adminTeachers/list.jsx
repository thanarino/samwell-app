import React, { Component } from 'react';
import { List , Grid, Button, Input} from 'semantic-ui-react';
import AddTeacherButton from '../adminTeachers/addTeacherButton.jsx';

export default class TeacherList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Grid columns={3} divided='vertically'>
                <Grid.Row>
                    <Grid.Column width={4}>
                        {/* <Button color='teal'>Add New Teacher</Button> */}
                        <AddTeacherButton/>
                    </Grid.Column>
                    <Grid.Column width={12}>
                        <Input fluid icon='search' placeholder='Search for Teacher' size='big'/>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={16} size='big'>
                        <List animated selection verticalAlign='middle'>
                            <List.Item>
                                <List.Content>
                                    <List.Header>Helen</List.Header>
                                </List.Content>
                            </List.Item>
                            <List.Item>
                                <List.Content>
                                    <List.Header>Christian</List.Header>
                                </List.Content>
                            </List.Item>
                            <List.Item>
                                <List.Content>
                                    <List.Header>Daniel</List.Header>
                                </List.Content>
                            </List.Item>
                        </List>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}