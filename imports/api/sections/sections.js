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
            createdAt: new Date(),
            isDeleted: false,
        });
    }, 
    'sections.delete'(sectionID) {
        check(sectionID, String);

        Sections.update(sectionID, { $set: { isDeleted: true } });
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
        Sections.update(sectionID, {
            $set: { 
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
                room
        }})
    }
})