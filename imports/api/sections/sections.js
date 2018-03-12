import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Sections = new Mongo.Collection('sections');

if (Meteor.isServer) {
    Meteor.publish('sections', function sectionsPublication() {
        return Sections.find();
    });
}

Meteor.methods({
    'sections.insert'(userID, sectionName, studentList, teacherList, subject, year, semester, classType, startTime, endTime, daysList, description, room) {
        check(userID, String);
        check(sectionName, String);
        check(studentList, [String]);
        check(teacherList, [String]);
        check(subject, String);
        check(year, Number);
        check(semester, String);
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
            year,
            semester,
            classType,
            startTime,
            endTime,
            daysList,
            description,
            room,
            createdAt: new Date(),
            isDeleted: false,
        });
    } 
})