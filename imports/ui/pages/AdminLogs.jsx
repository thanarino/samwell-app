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
                <Table celled selectable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Date</Table.HeaderCell>
                            <Table.HeaderCell>Time</Table.HeaderCell>
                            <Table.HeaderCell>User</Table.HeaderCell>
                            <Table.HeaderCell>Description</Table.HeaderCell>
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
            </div>
        );
    }
};