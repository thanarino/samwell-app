import React, { Component } from 'react';
import { Grid, Label, Header, Icon, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import _ from 'lodash';

import SiteHeader from '../components/common/header.jsx';
import '../../../node_modules/react-big-calendar/lib/css/react-big-calendar.css';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

BigCalendar.momentLocalizer(moment);

// https://www.npmjs.com/package/react-big-calendar

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
                <Grid.Column className='calendarColumn' width={10}>
                    {/* <TeacherList callback={this.getTeacher.bind(this)} /> */}
                    <BigCalendar
                        events={[
                            {
                                id: 0,
                                title: 'All Day Event very long title',
                                allDay: true,
                                start: new Date(2018, 3, 0),
                                end: new Date(2018, 3, 1),
                            },
                            {
                                id: 1,
                                title: 'Long Event',
                                start: new Date(2018, 3, 7),
                                end: new Date(2018, 3, 10),
                            }
                        ]}
                        defaultView='week'
                        step={60}
                        showMultiDayTimes
                        defaultDate={new Date()}
                    />
                </Grid.Column>
                <Grid.Column width={6}>
                    {/* <TeacherInfoPanel teacher={this.state.teacher} /> */}
                    <Grid.Row>
                        <Header size='large' floated='left'>
                            <Icon name='calendar' />
                            <Header.Content>
                                Consultations
                            </Header.Content>
                        </Header>
                        <Button icon labelPosition='right' floated='right'>
                            <Icon name='plus' />
                            Schedule new
                        </Button>
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
    }

    render() {
        const teacher = this.props.teacher;
        return (
            <div>
                {teacher.approved && _.includes(teacher.roles, "teacher") ? <Approved teacher={teacher} /> : <Unapproved teacher={teacher} />}
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