import React, { Component } from 'react';
import { Grid, Label, Header, Icon, Button, Image, Card, Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
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
        <Grid columns={2} divided padded>
            <Grid.Row centered>    
                <Grid.Column width={16}>
                    <Header 
                        as='h1'
                        size='huge'
                        textAlign='center' >
                        <Image circular src={teacher.services.google ? teacher.services.google.picture : default_pp} /> {` ${teacher.family_name}, ${teacher.given_name}`}
                    </Header>    
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width={16}>
                    <Card fluid>
                        <Card.Content header='Profile' />
                        <Card.Content>
                            <Table definition>
                                <Table.Body>
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
                                        <Table.Cell>{teacher.classes ? JSON.stringify(teacher.classes) : "No data"}</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>Consultation Hours</Table.Cell>
                                        <Table.Cell>{teacher.consultationHours ? JSON.stringify(teacher.consultationHours) : "No data"}</Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            </Table>
                        </Card.Content>
                    </Card>
                </Grid.Column>
            </Grid.Row>    
            <Grid.Row centered>
                <Grid.Column width={5}>
                    <ClassPanel teacher = {teacher}/>
                </Grid.Column>
                <Grid.Column width={5}>
                    <ClassPanel teacher={teacher} />
                </Grid.Column>
            </Grid.Row>    
        </Grid>
    </div>
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