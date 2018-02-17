import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Roles } from 'meteor/alanning:roles';

import App from '../imports/ui/layouts/App'

Meteor.startup(() => {
    render( <App/> , document.getElementById('app'));
});

FlowRouter.wait();
Tracker.autorun(() => {
    if (Roles.subscription.ready() && !FlowRouter._initialized) {
        FlowRouter.initialize();
    }
})