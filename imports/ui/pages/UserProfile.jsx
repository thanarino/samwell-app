import React, { Component } from 'react';
import { Grid, Label, Header, Icon, Button, Image } from 'semantic-ui-react';
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
        <Grid columns={2} divided padded centered>
            <Grid.Row>    
                <Grid.Column>
                    <Header 
                        as='h1'
                        size='huge'
                        textAlign='center' >
                        <Image circular src={teacher.services.google ? teacher.services.google.picture : default_pp} /> {` ${teacher.family_name}, ${teacher.given_name}`}
                    </Header>    
                </Grid.Column>
            </Grid.Row>    
            <Grid.Row>
                <Grid.Column>
                    <ClassPanel teacher = {teacher}/>
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