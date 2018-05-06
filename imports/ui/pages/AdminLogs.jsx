import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import SiteHeader from '../components/common/header';

export default class AdminLogs extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id='adminLogs'>
                <SiteHeader active="logs" teacher={null} />
                <Grid centered>
                    <Grid.Column width={12}>
                        <Table celled selectable>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell width={2}>Date</Table.HeaderCell>
                                    <Table.HeaderCell width={2}>Time</Table.HeaderCell>
                                    <Table.HeaderCell width={3}>User</Table.HeaderCell>
                                    <Table.HeaderCell width={9}>Description</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell>John</Table.Cell>
                                    <Table.Cell>No Action</Table.Cell>
                                    <Table.Cell>None</Table.Cell>
                                    <Table.Cell>None</Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>    
                    </Grid.Column>    
                </Grid>
            </div>
        );
    }
};