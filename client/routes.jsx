import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';
import { Session } from 'meteor/session';

import App from '../imports/ui/layouts/App.jsx';
import AuthPage from '../imports/ui/pages/AuthPage.jsx';
import AdminTeachers from '../imports/ui/pages/AdminTeachers.jsx';
import AdminClasses from '../imports/ui/pages/AdminClasses.jsx';
import AdminLogs from '../imports/ui/pages/AdminLogs.jsx';
import UserConsultations from '../imports/ui/pages/UserConsultations.jsx';

let publicRoutes = FlowRouter.group({});

publicRoutes.route('/', {
    name: 'login',
    triggersEnter: [function (context, redirect) {
        if (Meteor.userId()) {
            redirect('/user/admin/teachers');
        }
    }],
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

// user/messages
// userRoutes.route('/messages', {
//     name: 'messages',
//     action() {
//         mount(App, {
//             content: <p>this is messages page</p>
//         })
//     }
// });

// user/consultations
userRoutes.route('/consultations', {
    name: 'user.consultations',
    action() {
        mount(App, {
            content: <UserConsultations/>
        })
    }
});

// user/profile
userRoutes.route('/profile', {
    name: 'user.profile',
    action() {
        mount(App, {
            content: <p>this is profile</p>
        })
    }
});

// user/logout
userRoutes.route('/logout', {
    name: 'logout',
    action() {
        Meteor.logout(() => {
            FlowRouter.go(FlowRouter.path('login'));
        })
    }
})

let adminRoutes = userRoutes.group({
    prefix: '/admin',
    triggersEnter: [() => {
        if (!(Roles.userIsInRole(Meteor.user(), ['admin']))) {
            if (Meteor.user()) {
                FlowRouter.go(FlowRouter.path('consultations'));
            } else {
                FlowRouter.go(FlowRouter.path('login'));
            }
        }
    }]
});

// user/admin/teachers
adminRoutes.route('/teachers', {
    name: 'teachers',
    action() {
        mount(App, {
            content: <AdminTeachers/>
        });
    }
});

// user/admin/logs
adminRoutes.route('/logs', {
    name: 'logs',
    action() {
        mount(App, {
            content: <AdminLogs />
        });
    }
});

// user/admin/classes
adminRoutes.route('/classes', {
    name: 'classes',
    action() {
        mount(App, {
            content: <AdminClasses />
        });
    }
});

// user/admin/consultations
adminRoutes.route('/consultations', {
    name: 'admin.consultations',
    action() {
        mount(App, {
            content: <p> this is consultations for admin </p>
        })
    }
});