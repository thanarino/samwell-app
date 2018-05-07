import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Random } from 'meteor/random';
import _ from 'lodash';

import { Logs } from '../logs/logs.js';

export const Sections = new Mongo.Collection('sections');

if (Meteor.isServer) {
    Meteor.publish('sections', function sectionsPublication() {
        return Sections.find();
    });
}

Meteor.methods({
    'sections.insert'(userID, sectionName, studentList, teacherList, subject, semester, classType, startTime, endTime, daysList, description, room) {
        check(userID, String);
        check(sectionName, String);
        check(studentList, [String]);
        check(teacherList, [String]);
        check(subject, String);
        check(semester, {
            value: String,
            endYear: Number,
            startYear: Number,
            start: Number,
            end: Number,
        });
        check(classType, String);
        check(startTime, String);
        check(endTime, String);
        check(daysList, [String]);
        check(description, String);
        check(room, String);

        if (!this.userId) throw new Meteor.Error('not-authorized');
        
        Sections.insert({
            userID,
            sectionName,
            studentList,
            teacherList,
            subject,
            semester,
            classType,
            startTime,
            endTime,
            daysList,
            description,
            room,
            code: Random.id(7),
            createdAt: new Date(),
            isDeleted: false,
        }, (err, res) => {
            if (error) {
                console.log(error);
            } else {
                Meteor.call('logs.insert', userID, {
                    date: new Date(),
                    description: `Create new section ${subject} - ${sectionName}`,
                });
            }
        });
    }, 
    'sections.delete'(sectionID) {
        check(sectionID, String);

        Sections.rawCollection().findAndModify({ sectionID },
            { _id: 1 },
            { $set: { isDeleted: true } },
            { remove: false, new: true },
            Meteor.bindEnvironment((err, res) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(res);
                    let doc = res.value;
                    console.log(doc);
                    Meteor.call('logs.insert', doc.userID, {
                        date: new Date(),
                        description: `Archived section ${doc.subject} - ${doc.sectionName}`,
                    });
                }
            })
        );

        // Sections.update(sectionID, { $set: { isDeleted: true } }, (err, res) => {
        //     if (error) {
        //         console.log(error);
        //     } else {
        //         Meteor.call('logs.insert', userID, {
        //             date: new Date(),
        //             description: `Create new section ${subject} - ${sectionName}`,
        //         });
        //     }
        // });
    },
    'sections.update'(sectionID, sectionName, studentList, teacherList, subject, semester, classType, startTime, endTime, daysList, description, room) {
        check(sectionID, String);
        check(sectionName, String);
        check(studentList, [String]);
        check(teacherList, [String]);
        check(subject, String);
        check(semester, {
            value: String,
            endYear: Number,
            startYear: Number,
            start: Number,
            end: Number,
        });
        check(classType, String);
        check(startTime, String);
        check(endTime, String);
        check(daysList, [String]);
        check(description, String);
        check(room, String);
        // Sections.update(sectionID, {
        //     $set: {
        //         sectionName,
        //         studentList,
        //         teacherList,
        //         subject,
        //         semester,
        //         classType,
        //         startTime,
        //         endTime,
        //         daysList,
        //         description,
        //         room
        //     }
        // });
        
        Sections.rawCollection().findAndModify({ sectionID: sectionID },
            { _id: 1 },
            { $set: { sectionName,
                studentList,
                teacherList,
                subject,
                semester,
                classType,
                startTime,
                endTime,
                daysList,
                description,
                room } },
            { remove: false, new: true },
            Meteor.bindEnvironment((err, res) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(res);
                    let doc = res.value;
                    console.log(doc);
                    Meteor.call('logs.insert', doc.userID, {
                        date: new Date(),
                        description: `Updated section ${doc.subject} - ${doc.sectionName}`,
                    });
                }
            })
        );

    },
    'sections.updateTeacher'(teacherID, classList) {
        check(teacherID, String);
        check(classList, [String]);

        //get all sections that contains teacherID in their teacherList
        const contained = Sections.find({ teacherList: teacherID });

        contained.map((section) => {
            // if the classlist does not contain the id of the current section,
            // remove teacher from section's classlist
            if (!_.includes(classList, section._id)) {
                // Sections.update(section, { $pull: { teacherList: teacherID } });
                Sections.rawCollection().findAndModify(section,
                    { _id: 1 },
                    { $pull: { teacherList: teacherID } },
                    { remove: false, new: true },
                    Meteor.bindEnvironment((err, res) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(res);
                            let doc = res.value;
                            console.log(doc);
                            Meteor.call('logs.insert', doc.userID, {
                                date: new Date(),
                                description: `Removed teacher ${teacherID} from section ${doc.subject} - ${doc.sectionName}`,
                            });
                        }
                    })
                );  
            }
        });

        classList.map((section) => {
            const found = Sections.find({ _id: section }).fetch();
            if (!_.includes(found[0].teacherList, teacherID)) {
                // Sections.update(section, { $push: { teacherList: teacherID } });
                Sections.rawCollection().findAndModify(section,
                    { _id: 1 },
                    { $push: { teacherList: teacherID } },
                    { remove: false, new: true },
                    Meteor.bindEnvironment((err, res) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(res);
                            let doc = res.value;
                            console.log(doc);
                            Meteor.call('logs.insert', doc.userID, {
                                date: new Date(),
                                description: `Added teacher ${teacherID} to section ${doc.subject} - ${doc.sectionName}`,
                            });
                        }
                    })
                );  
            }
        });
    },
    'sections.removeStudent'(sectionId, studentId) {
        check(sectionId, String);
        check(studentId, String);

        // Sections.update({ _id: sectionId }, { $pull: { studentList: studentId } });
        Sections.rawCollection().findAndModify({ _id: sectionId },
            { _id: 1 },
            { $pull: { studentList: studentId } },
            { remove: false, new: true },
            Meteor.bindEnvironment((err, res) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(res);
                    let doc = res.value;
                    console.log(doc);
                    Meteor.call('logs.insert', doc.userID, {
                        date: new Date(),
                        description: `Removed student ${studentId} from section ${doc.subject} - ${doc.sectionName}`,
                    });
                }
            })
        );  
    }
})