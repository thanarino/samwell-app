import { Sections } from '../imports/api/sections/sections';

Meteor.publish('teacherData', function () {
    var currentUser;
    currentUser = this.userId;

    if (currentUser) {
        return Meteor.users.find({
            _id: currentUser
        }, {
                fields: {
                    //Default
                    "emails": 1,
                    "profile": 1,
                    "roles": 1
                }
            });
    } else {
        return this.ready();
    }
});
