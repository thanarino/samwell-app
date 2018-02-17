import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';
import { Session } from 'meteor/session';

import App from '../imports/ui/layouts/App';
import AuthPage from '../imports/ui/pages/AuthPage';

let publicRoutes = FlowRouter.group({});

publicRoutes.route('/', {
    name: 'login',
    action() {
        mount(App, {
            content: <AuthPage />
        })
    }
});

let userRoutes = FlowRouter.group({
    prefix: '/user',
    name: 'user',
    triggersEnter: [() => {
        if (!(Meteor.loggingIn() || Meteor.userId())) {
            route = FlowRouter.current();

            if (!(route.route.name === 'login')) {
                //save the current route of user so that the page can redirect to it after logging in
                Session.set('redirectAfterLogin', route.path);
            }

            FlowRouter.go('login');
        }
    }]
});

userRoutes.route('/messages', {
    name: 'messages',
    action() {
        mount(App, {
            content: <p>this is messages page</p>
        })
    }
});

userRoutes.route('/consultations', {
    name: 'consultations',
    action() {
        mount(App, {
            content: <p>this is consultations page</p>
        })
    }
});

let adminRoutes = userRoutes.group({
    prefix: '/admin',
    triggersEnter: [() => {
        if (!(Roles.userIsInRole(Meteor.user(), ['admin']))) {
            FlowRouter.go(FlowRouter.path('messages'));
        }
    }]
});