import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Random } from 'meteor/random';
import _ from 'lodash';

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
                Sections.update(section, { $pull: { teacherList: teacherID } });
            }
        });

        classList.map((section) => {
            const found = Sections.find({ _id: section }).fetch();
            if (!_.includes(found[0].teacherList, teacherID)) {
                Sections.update(section, { $push: { teacherList: teacherID } });
            }
        });
    },
    'sections.removeStudent'(sectionId, studentId) {
        check(sectionId, String);
        check(studentId, String);

        Sections.update({ _id: sectionId }, { $pull: { studentList: studentId } });
    }
})