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
            startDate: Date,
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
            startDate: data.startDate,
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
                Meteor.call('logs.insert', userID, {
                    date: new Date(),
                    description: `Scheduled consultation with student ${data.studentID}`,
                });
            }
        });
    },
    'consultations.teacherApprove'(_id, approved) {
        check(_id, String);
        check(approved, Boolean);

        Consultations.rawCollection().findAndModify({ _id: _id },
            { _id: 1 },
            { $set: { isApprovedByTeacher: approved } },
            { remove: false, new: true },
            Meteor.bindEnvironment((err, res) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(res);
                    let doc = res.value;
                    console.log(doc);
                    Meteor.call('logs.insert', doc.teacherID, {
                        date: new Date(),
                        description: `${doc.isApprovedByTeacher ? `Approved` : `Disapproved`} consultation with student ${doc.studentID}.`,
                    });
                }
            })
        );
    }
})