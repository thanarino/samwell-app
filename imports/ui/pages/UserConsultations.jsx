import React, { Component } from 'react';
import { Grid, Label, Header, Icon, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import _ from 'lodash';

import AddConsultationButton from '../components/userConsultations/addConsultationButton.jsx';
import ConsultationTable from '../components/userConsultations/consultationTable.jsx';
import SiteHeader from '../components/common/header.jsx';
import Schedule from '../components/userConsultations/schedule.jsx';
import MoreInfoButton from '../components/userConsultations/moreInfoButton.jsx';

Unapproved = (props) => {
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

Approved = (props) => {
    return <div>
        <SiteHeader active='consultations' teacher={props.teacher} />
        <Grid columns={2} divided padded>
            <Grid.Row>
                <Grid.Column className='calendarColumn' width={9}>
                    <Schedule teacher={props.teacher}/>
                </Grid.Column>
                <Grid.Column width={7}>
                    <Grid.Row>
                        <Header size='large' floated='left'>
                            <Icon name='calendar'/>
                            <Header.Content>
                                Consultations
                            </Header.Content>
                        </Header>
                        <MoreInfoButton teacher={props.teacher}/>
                        <AddConsultationButton teacher={props.teacher}/>
                        <ConsultationTable teacher={props.teacher}/>
                    </Grid.Row>
                    <Grid.Row>
                    </Grid.Row>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </div>
}

class UserConsultations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teacher: {},
        }
    }

    componentWillReceiveProps(newProp) {
        if (newProp.teacher) {
            this.setState({ teacher: newProp.teacher });
        }
    }

    render() {
        const { teacher } = this.props;
        console.log(teacher);
        return (
            <div>
                {teacher.approved && !teacher.isDeleted && _.includes(teacher.roles, "teacher") ? <Approved teacher={teacher} /> : <Unapproved teacher={teacher} />}
            </div>
        )
    }
}

UserConsultations.protoTypes = {
    callback: PropTypes.func,
}

export default withTracker(() => {
    Meteor.subscribe('teachersAll');

    return {
        teacher: Meteor.users.findOne({ roles: "teacher", _id: Meteor.userId() })
    }
})(UserConsultations);