import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { check } from 'meteor/check';
import { Random } from 'meteor/random';

//import JS files that contain collection creation code
import '../imports/api/sections/sections.js';
import '../imports/api/consultations/consultations.js';

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
    'teacher.update'(userID, data) {
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
                }
            }
        );
    },
    'teacher.delete'(teacherID, isDeleted) {
        check(teacherID, String);
        check(isDeleted, Boolean);

        Meteor.users.update(teacherID, { $set: { isDeleted: isDeleted } });
    },
});
