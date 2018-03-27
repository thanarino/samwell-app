import React, { Component } from 'react';
import { List , Grid, Button, Input, Header, Icon, Image} from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';

import default_pp from '../../res/default_pp.jpg';
import AddTeacherButton from '../adminTeachers/addTeacherButton.jsx';
import LoginButton from '../login/LoginButton';

class TeacherList extends Component {
    constructor(props) {
        super(props);
    }

    sendToParent = (teacher) => {
        this.props.callback(teacher);
    }

    render() {
        return (
            <Grid columns={3} divided='vertically'>
                <Grid.Row>
                    {/* <Grid.Column width={4}>
                        <AddTeacherButton/>
                    </Grid.Column> */}
                    <Grid.Column width={16}>
                        <Input fluid icon='search' placeholder='Search for Teacher' size='large'/>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={16} size='big'>
                        <Header as='h2'>
                            <Icon name='idea' />
                            <Header.Content>
                                Teachers
                            </Header.Content>
                        </Header>
                        <List animated selection verticalAlign='middle'>
                            {this.props.teachers.map((teacher, index) => 
                                <List.Item onClick={this.sendToParent.bind(this, teacher)} key={index}>
                                    <Image avatar src={teacher.services.google ? teacher.services.google.picture : default_pp} />
                                    <List.Content>
                                        <List.Header>
                                            {teacher.family_name && teacher.given_name ? `${teacher.family_name}, ${teacher.given_name}` : teacher.email}
                                        </List.Header>
                                        <List.Description>{teacher.email}</List.Description>
                                    </List.Content>
                                </List.Item>
                            )}
                        </List>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

TeacherList.protoTypes = {
    callback: PropTypes.func,
}

export default withTracker(() => {
    Meteor.subscribe('teachersAll');

    return {
        teachers: Meteor.users.find({roles: "teacher"}, { sort: { createdAt: -1 } }).fetch()
    }
})(TeacherList);