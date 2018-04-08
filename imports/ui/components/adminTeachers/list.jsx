import React, { Component } from 'react';
import { Label, List, Grid, Button, Input, Header, Icon, Image, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';

import default_pp from '../../res/default_pp.jpg';
import AddTeacherButton from '../adminTeachers/addTeacherButton.jsx';
import LoginButton from '../login/LoginButton';

class TeacherList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teachers: [],
            search: []
        }
    }

    sendToParent = (teacher) => {
        this.props.callback(teacher);
    }

    handleChange = (e, { value }) => {
        if (value === "") {
            this.setState({ search: this.state.teachers });
        } else {
            this.setState({ search: _.filter(this.state.search, (item) => { return item.email.toLowerCase().indexOf(value.toLowerCase()) > -1 || item.family_name.toLowerCase().indexOf(value.toLowerCase()) > -1 || item.given_name.toLowerCase().indexOf(value.toLowerCase()) > -1 }) });
        }
    }

    componentWillReceiveProps(newProp) {
        if (newProp.teachers.length != 0) {
            this.setState({ teachers: newProp.teachers, search: newProp.teachers });
        }
    }

    render() {
        return (
            <Grid columns={3} divided='vertically'>
                <Grid.Row>
                    {/* <Grid.Column width={4}>
                        <AddTeacherButton/>
                    </Grid.Column> */}
                    <Grid.Column width={16}>
                        <Input fluid icon='search' placeholder='Search for Teacher' size='large' onChange={this.handleChange} loading={this.props.teachers.length == 0}/>
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
                        <List animated selection verticalAlign='middle' className="scrollableList">
                            { this.props.teachers.length != 0 ?
                                this.state.search.map((teacher, index) => 
                                <List.Item onClick={this.sendToParent.bind(this, teacher)} key={index}>
                                    {teacher.approved ? null :
                                        <List.Content floated='right'>
                                            <Label color='red' size='large'>
                                                unapproved
                                            </Label>
                                        </List.Content>}
                                    {teacher.isDeleted ?
                                        <List.Content floated='right'>
                                            <Label color='teal' size='large'>
                                                archived
                                            </Label>
                                        </List.Content>
                                        : null}    
                                    <Image avatar src={teacher.services.google ? teacher.services.google.picture : default_pp} />
                                    <List.Content>
                                        <List.Header>
                                            {teacher.family_name && teacher.given_name ? `${teacher.family_name}, ${teacher.given_name}` : teacher.email}
                                        </List.Header>
                                        <List.Description>{teacher.email}</List.Description>
                                    </List.Content>
                                </List.Item>
                                ) : <Loader active inline='centered' /> }
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
        teachers: Meteor.users.find({ roles: 'teacher'}, { sort: { createdAt: -1 } }).fetch()
    }
})(TeacherList);