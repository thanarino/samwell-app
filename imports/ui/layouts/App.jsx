import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showConnectionIssue: false
        };
        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ showConnectionIssue: true });
        }, CONNECTION_ISSUE_TIMEOUT);
    }

    logout() {
        Meteor.logout();
    }

    render() {
        const { showConnectionIssue } = this.state;
        const {
            user,
            connected,
            loading,
            children,
            location,
        } = this.props;

        const clonedChildren = children && React.cloneElement(children, {
            key: location.pathname,
        });

        return (
            <div id="container">
                <section id="menu">
                    add menu here
                </section>
                {showConnectionIssue && !connected ? <ConnectionNotification /> : null}
                <div id="content-container">
                </div>
            </div>
        );
    }
}

App.propTypes = {
    user: React.PropTypes.object,      // current meteor user
    connected: React.PropTypes.bool,   // server connection status
    loading: React.PropTypes.bool,     // subscription status
    children: React.PropTypes.element, // matched child route component
    location: React.PropTypes.object,  // current router location
    params: React.PropTypes.object,    // parameters of the current route
};

App.contextTypes = {
    router: React.PropTypes.object,
};
