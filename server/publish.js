import { Sections } from '../imports/api/sections/sections';

Meteor.publish('teachersAll', function () {
    var currentUser;
    currentUser = this.userId;

    if (currentUser) {
        return Meteor.users.find({}, {
                fields: {
                    //Default
                    "_id": 1,
                    "email": 1,
                    "given_name": 1,
                    "family_name": 1,
                    "roles": 1,
                    "services.google.picture": 1,
                }
            });
    } else {
        return this.ready();
    }
});
