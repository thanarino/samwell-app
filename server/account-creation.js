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

    user.profile = options.profile || {};

    const googleInfo = user.services.google;

    if (googleInfo) {
        user.department = "Not Available";
        user.office = "Not Available";
        user.position = "Not Available";
        user.available = false;
        user.approved = false;
        user.isDeleted = false;
        user.classes = [];
        user.consultationHours = [
                    { day: 'Sun', time: [], fullName: "Sunday" },
                    { day: 'Mon', time: [], fullName: "Monday" },
                    { day: 'Tue', time: [], fullName: "Tuesday" },
                    { day: 'Wed', time: [], fullName: "Wednesday" },
                    { day: 'Thu', time: [], fullName: "Thursday" },
                    { day: 'Fri', time: [], fullName: "Friday" },
                    { day: 'Sat', time: [], fullName: "Saturday" }
                ];
        user.email = googleInfo.email;
        user.given_name = googleInfo.given_name;
        user.middle_name = "Not Available";
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
    }
    // else if (options.profile.first) {
    //     user.family_name = options.profile.lastName;
    //     user.given_name = options.profile.firstName;
    //     user.middle_name = options.profile.middleName;
    //     user.email = options.profile.email;
    //     user.department = options.profile.department;
    //     user.position = options.profile.position;
    //     user.office = options.profile.office;
    //     user.classes = options.profile.classes;
    //     user.consultation_hours = options.profile.consultationHours;
    //     user.available = options.profile.available;
    //     user.profile = {};
    //     user.roles = ["teacher"];
    //     user.profile.organization = ["teachers"];
    // }
    else {
        user.roles = ["admin"];
        user.profile.organization = ["admins"];
    }

    return user;
});