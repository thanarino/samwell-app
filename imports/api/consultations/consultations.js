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
    'consultations.insert'(userID, studentID, teacherID, sectionID, startTime, endTime, date, isApprovedByStudent, isApprovedByTeacher) {
        check(userID, String);
        check(studentID, String);
        check(teacherID, String);
        check(sectionID, String);
        check(startTime, String);
        check(endTime, String);
        check(date, Date);
        check(isApprovedByStudent, Boolean);
        check(isApprovedByTeacher, Boolean);

        Consultations.insert({
            userID,
            studentID,
            teacherID,
            sectionID,
            startTime,
            endTime,
            date,
            isDone: false,
            isDeleted: false,
            isApprovedByStudent,
            isApprovedByTeacher,
            createdAt: new Date()
        });
    }
})