import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

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
        }, (error) => console.log(error));
    }
})