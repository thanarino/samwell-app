//create dis

import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import SimpleSchema from 'simpl-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { _ } from 'meteor/underscore';

import { Sections } from './sections.js';

// const SectionSchema = new SimpleSchema({
//     sectionID: Sections.simpleSchema().schema('sectionID'),
//     createdAt: Sections.simpleSchema().schema('createdAt'),
//     userID: Sections.simpleSchema().schema('userID'),
//     sectionName: Sections.simpleSchema().schema('sectionName'),
//     studentList: Sections.simpleSchema().schema('studentList'),
//     'studentList.$': Sections.simpleSchema().schema('studentList.$'),
//     teacherList: Sections.simpleSchema().schema('teacherList'),
//     'teacherList.$': Sections.simpleSchema().schema('teacherList.$'),
//     subject: Sections.simpleSchema().schema('subject'),
//     year: Sections.simpleSchema().schema('year'),
//     semester: Sections.simpleSchema().schema('semester'),
//     classType: Sections.simpleSchema().schema('classType'),
//     startTime: Sections.simpleSchema().schema('startTime'),
//     endTime: Sections.simpleSchema().schema('endTime'),
//     daysList: Sections.simpleSchema().schema('daysList'),
//     'daysList.$': Sections.simpleSchema().schema('daysList.$'),
//     isDeleted: Sections.simpleSchema().schema('isDeleted'),
// }).validator();

export const insert = new ValidatedMethod({
    name: 'sections.insert',
    validate: Sections.simpleSchema().pick(['userID', 'sectionName', 'studentList', 'teacherList', 'subject', 'year', 'semester', 'classType', 'startTime', 'endTime', 'daysList']).validator({ clean: true, filter: false }),
    run({ userID, sectionName, studentList, teacherList, subject, year, semester, classType, startTime, endTime, daysList }) {
        const toAdd = {
            createdAt: new Date(),
            userID,
            sectionName,
            studentList,
            teacherList,
            subject,
            semester,
            year,
            classType,
            startTime,
            endTime,
            daysList
        };
        Sections.insert(toAdd);
    },
});

const SECTIONS_METHODS = _.pluck([
    insert,
], 'name');

if (Meteor.isServer) {
    DDPRateLimiter.addRule({
        name(name) {
            return _.contains(SECTIONS_METHODS, name);
        },

        connectionId() { return true; },
    }, 5, 1000);
}