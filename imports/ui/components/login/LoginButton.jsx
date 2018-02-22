import React, { Component } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { Meteor } from "meteor/meteor";

export default class LoginButton extends Component {
    constructor(props) {
        super(props);
    }

    handleClick = () => {
        Meteor.loginWithGoogle({}, (err) => {
            if (err) {
                throw new Meteor.Error('Google Login Failed');
            }
        })
    }

    render() {
        return (
            <Button icon size='big' onClick={this.handleClick}>
                Log in with &nbsp;
                <Icon name='google'/>
            </Button>
        );
    }
}