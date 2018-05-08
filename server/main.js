import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { check } from 'meteor/check';
import { Random } from 'meteor/random';

//import JS files that contain collection creation code
import '../imports/api/sections/sections.js';
import '../imports/api/consultations/consultations.js';
import '../imports/api/logs/logs.js';

import { Logs } from '../imports/api/logs/logs.js';

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
            }
        });
    }  
});

Meteor.methods({
    'teacher.add'(userID, teacher) {
        check(userID, String);
        check(teacher, {
            lastName: String,
            firstName: String,
            middleName: String,
            email: String,
            department: String,
            position: String,
            office: String,
            classes: [String],
            consultationHours: [{
                day: String,
                time: [{
                    start: String,
                    end: String
                }],
                fullName: String
            }],
            available: Boolean,
            approved: Boolean,
        })

        let data = Object.assign({
            username: teacher.email,
            password: Random.id(),
            first: true
        }, teacher);

        const teacherID = Accounts.createUser({ username: data.username, email: data.email, password: data.password, profile: data });

        if (teacherID) {
            console.log('teacherID valid');
            Meteor.call('sections.updateTeacher', teacherID, data.classes);
        }
    },
    'teacher.update'(_id, userID, data) {
        check(_id, String);
        check(userID, String);
        check(data, {
            family_name: String,
            given_name: String,
            middle_name: String,
            email: String,
            department: String,
            position: String,
            office: String,
            classes: [String],
            consultationHours: [{
                day: String,
                time: [{
                    start: String,
                    end: String
                }],
                fullName: String
            }],
            available: Boolean,
            approved: Boolean
        });

        Meteor.users.update({ _id: userID }, { $set: { family_name: data.family_name, given_name: data.given_name, middle_name: data.middle_name, email: data.email, department: data.department, position: data.position, office: data.office, classes: data.classes, consultationHours: data.consultationHours, available: data.available, approved: data.approved } },
            (err, n) => {
                console.log(err);
                console.log(n);
                if (n) {
                    console.log("went hererere");
                    Meteor.call('sections.updateTeacher', userID, data.classes);
                    Meteor.call('logs.insert', _id, {
                        date: new Date(),
                        description: `Updated teacher ${data.given_name} ${data.middle_name} ${data.family_name}`,
                    });
                }
            }
        );
    },
    'teacher.delete'(userID, teacherID, isDeleted) {
        check(teacherID, String);
        check(isDeleted, Boolean);

        Meteor.users.rawCollection().findAndModify({ _id: teacherID },
            { _id: 1 },
            { $set: { isDeleted: isDeleted } },
            { remove: false, new: true },
            Meteor.bindEnvironment((err, res) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(res);
                    let doc = res.value;
                    console.log(doc);
                    Meteor.call('logs.insert', userID, {
                        date: new Date(),
                        description: `${doc.isDeleted ? `Archived` : `Recovered`} teacher ${doc.given_name} ${doc.middle_name} ${doc.family_name}`,
                    });
                }
            })
        );

        // Meteor.users.update(teacherID, { $set: { isDeleted: isDeleted } }, (err, n) => {
        //     if (n) {
        //         Meteor.call('logs.insert', userID, {
        //             date: new Date(),
        //             description: `Updated teacher ${data.given_name} ${data.middle_name} ${data.family_name}`,
        //         });
        //     }
        // });
    },
    'teacher.setAvailable'(teacherID, isAvailable) {
        check(teacherID, String);
        check(isAvailable, Boolean);

        let doc = undefined;

        // Meteor.users.update(teacherID, { $set: { available: isAvailable } });
        const res = Meteor.users.rawCollection().findAndModify({ _id: teacherID },
            { _id: 1 },
            { $set: { available: isAvailable } },
            { remove: false, new: true },
            Meteor.bindEnvironment((err, res) => {
                if (err) {
                    console.log('err backend: ', err);
                    throw new Meteor.Error('set-available-error', "There is an error in the database.");
                } else {
                    console.log('res: ', res);
                    doc = res.value;
                    console.log('doc: ', doc);
                    Meteor.call('logs.insert', teacherID, {
                        date: new Date(),
                        description: `Changed status from ${!doc.available ? `available` : `unavailable`} to ${doc.available ? `available` : `unavailable`} `,
                    });
                    return doc;
                }
            })
        );

        return res;
    }
});
