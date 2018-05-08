import React, { Component } from 'react';
import { Table, Grid, Loader, Header } from 'semantic-ui-react';
import SiteHeader from '../components/common/header';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import moment from 'moment';
import _ from 'lodash';

import { Logs } from '../../api/logs/logs.js';

class AdminLogs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            column: null,
            logs: [],
            direction: null,
        }
    }

    componentWillReceiveProps(newProp) {
        console.log('newprop:', newProp);
        if (newProp.logs.length > 0) {
            this.setState({
                logs: newProp.logs
            }, () => {
                console.log(this.state);
            });
        }
    }

    handleSort = clickedColumn => () => {
        const { column, logs, direction } = this.state

        if (column !== clickedColumn) {
            this.setState({
                column: clickedColumn,
                logs: _.sortBy(logs, [clickedColumn]),
                direction: 'ascending',
            })

            return
        }

        this.setState({
            logs: logs.reverse(),
            direction: direction === 'ascending' ? 'descending' : 'ascending',
        })
    }

    render() {
        const { column, direction } = this.state;
        const { logs } = this.props;
        return (
            <div id='adminLogs'>
                <SiteHeader active="logs" teacher={null} />
                <Grid centered>
                    <Grid.Row>
                        <Grid.Column width={12}>
                            <Header as='h1' textAlign='center'>Activity Logs</Header>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={12}>
                            {this.props.logs.length ? <Table celled selectable>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell width={4} sorted={column === 'date' ? direction : null} onClick={this.handleSort('date')}>Date</Table.HeaderCell>
                                        <Table.HeaderCell width={2} sorted={column === 'time' ? direction : null} onClick={this.handleSort('time')}>Time</Table.HeaderCell>
                                        <Table.HeaderCell width={3} sorted={column === 'name' ? direction : null} onClick={this.handleSort('name')}>User</Table.HeaderCell>
                                        <Table.HeaderCell width={7} sorted={column === 'description' ? direction : null} onClick={this.handleSort('description')}>Description</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    {this.state.logs.map((log) =>
                                        <Table.Row>
                                            <Table.Cell>{moment(log.date).format('dddd, MMMM Do YYYY')}</Table.Cell>
                                            <Table.Cell>{moment(log.date).format('hh:mm A')}</Table.Cell>
                                            <Table.Cell>{log.user}</Table.Cell>
                                            <Table.Cell>{log.description}</Table.Cell>
                                        </Table.Row>
                                    )}
                                </Table.Body>
                            </Table> : <Loader active inline='centered' />}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
};

AdminLogs.protoTypes = {
    callback: PropTypes.func,
};

export default withTracker(() => {
    Meteor.subscribe('logs');

    return {
        logs: Logs.find({}, { sort: { date: -1 } }).fetch()
    }
})(AdminLogs);