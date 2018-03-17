import { Accounts } from 'meteor/accounts-base';

// supply data for extending the User Collection when user signs in for the first time

// Accounts.validateNewUser((user) => {
//     var email = user.services.google.email;

//     console.log(email);

//     if (!email) throw Meteor.Error(404, "User not found. Contact Admin for details.");

    

//     return true;

// });

Accounts.onCreateUser((options, user) => {
    if (!user.services.google && !user.username === 'admin') {
        throw new Error('Expected login with Google only');
    }

    console.log('went here');

    let foundEmail = Meteor.users.find({ email: user.services.google.email });

    if (!foundEmail.length) { 
        throw new Error('Email not found');
    }

    user.profile = options.profile || {};

    const googleInfo = user.services.google;

    if (googleInfo) {
        user.email = googleInfo.email;
        user.given_name = googleInfo.given_name;
        user.family_name = googleInfo.family_name;
        user.photo = googleInfo.photo;
        user.gender = googleInfo.gender;
        /*google info:
            accessToken
            idToken
            scope
            expiresAt
            id
            email
            verified_email
            name
            given_name
            family_name
            picture
            gender
        */
        user.roles = ["teacher"];
        user.profile.organization = ["teachers"];
    } else {
        user.roles = ["admin"];
        user.profile.organization = ["admins"];
    }

    return user;
});