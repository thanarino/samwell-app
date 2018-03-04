import React, { Component } from 'react';
import { Menu, Button, Icon, Divider } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { FlowRouter } from 'meteor/kadira:flow-router';

export default class Header extends Component {
    static propTypes = {
        active: PropTypes.string,
    }

    state = {
        activeItem: this.props.active ? this.props.active : 'teachers'
    }

    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name });
        FlowRouter.go(`/user/admin/${name}`);
    }

    logOut = () => {
        Meteor.logout((error) => {
            if (error) {
                Meteor.error('There is an error logging out.');
            } else {
                FlowRouter.go(FlowRouter.path('login'));
            }
        })
    }

    render() {
        const { active } = this.props
        const { activeItem } = this.state

        return (
            <Menu stackable secondary color='teal' inverted size='huge'>
                <Menu.Item>
                    <Icon name='hand spock'/>
                    <p>ADMIN</p>
                </Menu.Item>

                <Menu.Menu position='right'>
                    <Menu.Item
                        name='classes'
                        active={activeItem === 'classes'}
                        onClick={this.handleItemClick}
                    > Classes </Menu.Item>
                    
                    <Menu.Item
                        name='teachers'
                        active={activeItem === 'teachers'}
                        onClick={this.handleItemClick}
                    > Teachers </Menu.Item>

                    <Menu.Item
                        name='logs'
                        active={activeItem === 'logs'}
                        onClick={this.handleItemClick}
                    > Logs </Menu.Item>
                    
                    <Menu.Item>    
                        <Button color='teal' icon labelPosition='right' onClick={this.logOut}>
                            Sign Out    
                            <Icon name='sign out'/> 
                        </Button>
                    </Menu.Item>    
                </Menu.Menu>    
            </Menu>
        )
    }
}
