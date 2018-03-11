import { Mongo } from 'meteor/mongo';
import { Factory } from 'meteor/dburles:factory';
import SimpleSchema from 'simpl-schema';
import faker from 'faker';

class SectionsCollection extends Mongo.Collection {
    insert(doc, callback) {
        const ourDoc = doc;
        ourDoc.createdAt = ourDoc.createdAt || new Date();
        ourDoc.isDeleted = false;
        let nextNumber = 1;
        while (this.findOne({ sectionID: nextNumber })) {
            nextNumber = nextNumber++;
        }
        ourDoc.sectionID = nextNumber.toString();
        return super.insert(ourDoc, callback);
    }
}

export const Sections = new SectionsCollection('Sections');

Sections.schema = new SimpleSchema({
    sectionID: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        denyUpdate: true,
    },
    createdAt: {
        type: Date,
        denyUpdate: true,
    },
    userID: {
        //userID of the admin
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        denyUpdate: true,
    },
    sectionName: {
        type: String,
        max: 128,
    },
    studentList: {
        //list of IDs of students
        type: Array,
    },
    "studentList.$": {
        type: String,
    },
    teacherList: {
        //list of IDs of teachers
        type: Array,
    },
    "teacherList.$": {
        type: String,
    },
    subject: {
        type: String,
    },
    year: {
        type: Number,
    },
    semester: {
        type: String,
        allowedValues: ['First', 'Second', 'Midyear', 'Summer'],
    },
    classType: {
        type: String,
        allowedValues: ['Lecture', 'Laboratory','Recitation', 'Other'],
    },
    startTime: {
        type: Date,
    },
    endTime: {
        type: Date,
    },
    daysList: {
        type: Array,
    },
    "daysList.$": {
        type: String,
        allowedValues: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    },
    isDeleted: {
        type: Boolean,
    },
});

Sections.attachSchema(Sections.schema);

Sections.publicFields = {
    userID: 1,
    sectionID: 1,
    createdAt: 1,
    sectionName: 1,
    studentList: 1,
    teacherList: 1,
    subject: 1,
    year: 1,
    semester: 1,
    classType: 1,
    startTime: 1,
    endTime: 1,
    daysList: 1,
    isDeleted: 1,
};

// Factory.define('section', Sections, {
//     sectionID: () => 1,
//     createdAt: () => new Date(),
//     sectionName: () => faker.lorem.word(),
//     studentList: () => 
// })