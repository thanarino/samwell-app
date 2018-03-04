import React, { Component } from 'react';
import { Button, Header, Icon, Input, Modal, Grid } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';

//@TODO: EXTEND USERS SCHEMA TO ACCOUNT FOR TEACHERS AND STUDENTS

export default class AdminLoginModal extends Component {
    constructor(props) {
        super(props);
    }

    handleClick = (event) => {
        event.preventDefault();
        let un = $('[name=username]').val();
        let pw = $('[name=password]').val();
        Meteor.loginWithPassword(un, pw, function (error) {
            if (error) {
                console.log(error);
            } else {
                FlowRouter.go('/user/admin/teachers');
            }
        });
    }

    render() {
        return (
            <Modal trigger={<Button icon size='small' className="absolute"><Icon name='lock' /></Button>} basic size='mini' closeIcon>
                <Header content='admin login' />
                <Modal.Content>
                    <Grid columns={1}>
                        <Grid.Row centered={true}>
                            <Input type='text' name='username' placeholder="Username" size='big' />
                        </Grid.Row>
                        <Grid.Row centered={true}>
                            <Input type='password' name='password' placeholder="Password" size='big' />
                        </Grid.Row>
                    </Grid>
                </Modal.Content>
                <Modal.Actions>
                    <Button basic color='green' onClick={this.handleClick.bind(this)}>Sign In</Button>
                </Modal.Actions>
            </Modal>
        );
    }
}