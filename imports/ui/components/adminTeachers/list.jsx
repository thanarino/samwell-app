import React, { Component } from 'react';
import { List , Grid, Button, Input, Header, Icon, Image} from 'semantic-ui-react';
import AddTeacherButton from '../adminTeachers/addTeacherButton.jsx';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';

class TeacherList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Grid columns={3} divided='vertically'>
                <Grid.Row>
                    <Grid.Column width={4}>
                        {/* <Button color='teal'>Add New Teacher</Button> */}
                        <AddTeacherButton/>
                    </Grid.Column>
                    <Grid.Column width={12}>
                        <Input fluid icon='search' placeholder='Search for Teacher' size='big'/>
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
                                <List.Item key={index}>
                                    <Image avatar src={teacher.services.google.picture} />
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