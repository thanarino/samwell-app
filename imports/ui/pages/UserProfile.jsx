import React, { Component } from 'react';
import { Grid, Label, Header, Icon, Button, Image, Card, Table, Checkbox, Popup } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import moment from 'moment';
import _ from 'lodash';
import SiteHeader from '../../ui/components/common/header';
import ClassPanel from '../../ui/components/userProfile/classPanel';

import default_pp from '../res/default_pp.jpg';

UnapprovedProfile = (props) => {
    return <div>
        <SiteHeader active='null' teacher={props.teacher} />
        <Header as='h1' icon textAlign='center'>
            <Icon name='frown' />
            <Header.Content>
                Your account is still unapproved.
            </Header.Content>
            <Header.Subheader>
                Contact the administrator to approve your account.
            </Header.Subheader>
        </Header>
    </div>
}

ApprovedProfile = (props) => {
    const { teacher } = props;
    return <div>
        <SiteHeader active='profile' teacher={teacher} />
        <Grid columns={2} padded>
            <Grid.Row centered>
                <Grid.Column width={5}>
                    <Header
                        as='h1'
                        size='huge'
                        textAlign='center' >
                        <Image circular src={teacher.services.google ? teacher.services.google.picture : default_pp} /> {` ${teacher.family_name}, ${teacher.given_name}  `}
                        <Popup
                            trigger={<Checkbox toggle checked={props.teacher.isAvailable} onChange={() => this.toggle(props.teacher)} />}
                            content='Are you available for consultation right now?'
                            position='right center'
                            inverted
                            basic
                        />
                    </Header>
                    <Table definition>
                        <Table.Body>
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
                        </Table.Body>
                    </Table>
                    <Card fluid>
                        <Card.Content header='Consultation Hours' />
                        <Card.Content>
                            <Table definition>
                                <Table.Body>
                                    {teacher.consultationHours ?
                                        teacher.consultationHours.map((day, index) =>
                                            <Table.Row key={index}>
                                                <Table.Cell>{day.fullName}</Table.Cell>
                                                <Table.Cell>{day.time.length == 0 ? "No consultation hours for this day." : day.time.map((time) => `${moment(time.start, 'hh:mm').format('hh:mm A')} to ${moment(time.end, 'hh:mm').format('hh:mm A')} `)}</Table.Cell>
                                            </Table.Row>
                                        ) :
                                        <Table.Row>
                                            <Table.Cell>Consultation Hours</Table.Cell>
                                            <Table.Cell>None yet</Table.Cell>
                                        </Table.Row>}
                                </Table.Body>
                            </Table>
                        </Card.Content>
                    </Card>
                </Grid.Column>
                <Grid.Column width={9}>
                    <ClassPanel teacher={teacher} />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </div>
}

toggle = (teacher) => {
    Meteor.call('teacher.setAvailable', teacher._id, !teacher.available, (err, res) => {
        if (res) {
            this.setState({ teacher });
        }
    });
}

class UserProfile extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const teacher = this.props.teacher;
        return (
            <div>
                {teacher.approved && !teacher.isDeleted && _.includes(teacher.roles, "teacher") ? <ApprovedProfile teacher={teacher} /> : <UnapprovedProfile teacher={teacher} />}
            </div>
        )

    }
}

UserProfile.protoTypes = {
    callback: PropTypes.func,
}

export default withTracker(() => {
    Meteor.subscribe('teachersAll');

    return {
        teacher: Meteor.users.findOne({ roles: "teacher", _id: Meteor.userId() })
    }
})(UserProfile);