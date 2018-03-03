import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Meteor.startup(() => {
  // code to run on server at startup
    if (Meteor.users.find().count() === 0) {
        Accounts.createUser({
            username: 'admin',
            password: 'admin',
            email: 'email@email.com',
            profile: {
                first_name: 'Admin',
                last_name: 'Admin'
            },
            roles: ['admin']
        });
        Meteor.loginWithPassword('admin', 'admin');
  }  
});
