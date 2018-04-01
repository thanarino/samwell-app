import React, { Component } from 'react';
import { Menu, Button, Icon, Divider, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { FlowRouter } from 'meteor/kadira:flow-router';
import _ from 'lodash';

import default_pp from '../../res/default_pp.jpg';

export default class SiteHeader extends Component {
    static propTypes = {
        active: PropTypes.string,
        teacher: PropTypes.object,
    }

    state = {
        activeItem: this.props.active ? this.props.active : 'profile'
    }

    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name });
        FlowRouter.go(`/user/admin/${name}`);
    }

    handleUserClick = (e, { name }) => {
        this.setState({ activeItem: name });
        FlowRouter.go(`/user/${name}`)
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
        const { active, teacher } = this.props
        const { activeItem } = this.state

        return (
            <Menu stackable secondary color='teal' inverted size='huge'>
                <Menu.Item>
                    <Icon name='hand spock'/>
                    Samwell { !teacher ? "Admin" : null }
                </Menu.Item>

                <Menu.Menu position='right'>
                    { !teacher ?
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
                        </Menu.Menu>
                        : teacher.approved && !teacher.isDeleted && _.includes(teacher.roles, "teacher") ?
                            <Menu.Menu position='right'>    
                                <Menu.Item
                                name='consultations'
                                active={activeItem === 'consultations'}
                                onClick={this.handleUserClick}
                                >
                                    Consultations
                                </Menu.Item>
                                <Menu.Item
                                    name='profile'
                                    active={activeItem === 'profile'}
                                    onClick={this.handleUserClick}
                                >
                                    <Image avatar src={teacher.services.google ? teacher.services.google.picture : default_pp} />
                                    {teacher.given_name}
                                </Menu.Item>
                            </Menu.Menu>    
                            : <Menu.Menu position='right'>
                                <Menu.Item
                                    name='profile'
                                    active={activeItem === 'profile'}
                                >
                                    <Image avatar src={default_pp} />
                                    {teacher.given_name}
                                </Menu.Item>
                            </Menu.Menu>}
                    
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
