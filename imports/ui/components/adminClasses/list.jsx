import React, { Component } from 'react';
import { List, Grid, Button, Input } from 'semantic-ui-react';
import AddClassButton from '../adminClasses/addClassButton.jsx';

export default class ClassList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Grid columns={3} divided='vertically'>
                <Grid.Row>
                    <Grid.Column width={4}>
                        {/* <Button color='teal'>Add New Class</Button> */}
                        <AddClassButton />
                    </Grid.Column>
                    <Grid.Column width={12}>
                        <Input fluid icon='search' placeholder='Search for Class' size='big' />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={16} size='big'>
                        <List animated selection verticalAlign='middle'>
                            <List.Item>
                                <List.Content>
                                    <List.Header>CMSCXXX</List.Header>
                                </List.Content>
                            </List.Item>
                            <List.Item>
                                <List.Content>
                                    <List.Header>MGTXXX</List.Header>
                                </List.Content>
                            </List.Item>
                            <List.Item>
                                <List.Content>
                                    <List.Header>SPCMXXX</List.Header>
                                </List.Content>
                            </List.Item>
                        </List>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}