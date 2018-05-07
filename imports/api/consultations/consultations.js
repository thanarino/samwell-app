import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { Logs } from '../logs/logs.js';

export const Consultations = new Mongo.Collection('consultations');

if (Meteor.isServer) {
    Meteor.publish('consultations', function consultationsPublication() {
        return Consultations.find();
    });
}

Meteor.methods({
    'consultations.insert'(userID, data, isApprovedByStudent, isApprovedByTeacher) {
        check(userID, String);
        check(data, {
            studentID: String,
            teacherID: String,
            sectionID: String,
            startTime: String,
            endTime: String,
            date: Number,
            year: Number,
        });
        check(isApprovedByStudent, Boolean);
        check(isApprovedByTeacher, Boolean);

        Consultations.insert({
            userID,
            studentID: data.studentID,
            teacherID: data.teacherID,
            sectionID: data.sectionID,
            startTime: data.startTime,
            endTime: data.endTime,
            date: data.date,
            year: data.year,
            isDone: false,
            isDeleted: false,
            isApprovedByStudent,
            isApprovedByTeacher,
            createdAt: new Date()
        }, (error, num) => { 
            if (error) {
                console.log(error);
            } else {
                Logs.insert({
                    userID,
                    data: {
                        date: new Date(),
                        description: `Scheduled consultation with student ${data.studentID}`,
                    }
                });
            }
        });
    },
    'consultations.teacherApprove'(_id, approved) {
        check(_id, String);
        check(approved, Boolean);

        Consultations.update({ _id: _id }, { $set: { isApprovedByTeacher: approved } }, (err, num) => {
            if (err) {
                console.log(err);
            } else {
                console.log("updated");
                Consultations.find({ _id: _id }, (err2, doc) => {
                    console.log(doc);
                    if (doc) {
                        console.log('went here', doc);
                        Logs.insert({
                            userID: doc[0].teacherID,
                            data: {
                                date: new Date(),
                                description: `${doc[0].isApprovedByTeacher ? `Approved` : `Disapproved`} consultation with student ${doc[0].studentID}.`,
                            }
                        });
                    } else {
                        console.log(err2);
                    }
                });
            }
        });
    }
})