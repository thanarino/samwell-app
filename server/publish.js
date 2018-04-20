import { Sections } from '../imports/api/sections/sections';

Meteor.publish('teachersAll', function () {
    var currentUser;
    currentUser = this.userId;

    if (currentUser) {
        return Meteor.users.find({ }, {
                fields: {
                    //Default
                    "_id": 1,
                    "email": 1,
                    "given_name": 1,
                    "family_name": 1,
                    "roles": 1,
                    "services.google.picture": 1,
                    "middle_name" : 1,
                    "department" : 1,
                    "position" : 1,
                    "office" : 1,
                    "classes" : 1,
                    "consultationHours" : 1,
                    "available" : 1,
                    "approved": 1,
                    "isDeleted" :1,
                }
            });
    } else {
        return this.ready();
    }
});

Meteor.publish('studentsAll', function () {
    var currentUser;
    currentUser = this.userId;

    if (currentUser) {
        return Meteor.users.find({ }, {
            fields: {
                //Default
                "_id": 1,
                "roles": 1,
                "profile_pic": 1,
                "given_name": 1,
                "family_name": 1,
                "gender": 1,
                "createdAt": 1,
                "isDeleted": 1,
            }
        });
    } else {
        return this.ready();
    }
});