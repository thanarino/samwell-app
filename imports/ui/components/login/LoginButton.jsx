import React, { Component } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { Meteor } from "meteor/meteor";

export default class LoginButton extends Component {
    constructor(props) {
        super(props);
    }

    handleClick = () => {
        Meteor.loginWithGoogle({
            requestPermissions: ['email']
        }, (err) => {
            if (err) {
                throw new Meteor.Error('Google Login Failed');
            }
        })
    }

    render() {
        return (
            <Button icon size={this.props.size} onClick={this.handleClick}>
                {this.props.content} &nbsp;
                <Icon name='google'/>
            </Button>
        );
    }
}