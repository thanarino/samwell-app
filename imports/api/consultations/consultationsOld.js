import { Mongo } from 'meteor/mongo';
import { Factory } from 'meteor/dburles:factory';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

class ConsultationsCollection extends Mongo.Collection {
    insert(doc, callback) {
        const ourDoc = doc;
        ourDoc.createdAt = ourDoc.createdAt || new Date();
        ourDoc.isDeleted = false;
        let nextNumber = 1;
        while (this.findOne({ consultationID: nextNumber })) {
            nextnumber = nextNumber++;
        }
        ourDoc.consultationID = nextNumber.toString();
        return super.insert(ourDoc, callback);
    }
}

export const Consultations = new ConsultationsCollection('Consultations');

Consultations.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
});

Consultations.schema = new SimpleSchema({
    consultationID: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        denyUpdate: true,
    },
    createdAt: {
        type: Date,
        denyUpdate: true,
    },
    userID: {
        //the person who set the consultation
        type: String,
        regEx: SimpleSchema.RegEx.Id,
    },
    studentID: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
    },
    teacherID: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
    },
    sectionID: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
    },
    startTime: {
        type: Date,
    },
    endTime: {
        type: Date,
    },
    isDeleted: {
        type: Boolean,
    },
});

Consultations.attachSchema(Consultations.schema);

Consultations.publicFields = {
    consultationID: 1,
    createdAt: 1,
    userID: 1,
    studentID: 1,
    teacherID: 1,
    sectionID: 1,
    startTime: 1,
    endTime: 1,
    isDeleted: 1,
};

// figure out user schema first
// Factory.define('consultation', Consultations, {
//     consultationID: () => 1,
//     createdAt: () => new Date(),
//     userID: () => Factory.get('student'),
//     studentID: () => Factory.get('student'),
//     teacherID: () => Factory.get('teacher'),
//     sectionID: () => Factory.get('section'),
//     startTime: () => new Date("February 17, 2018 10:00:00"),
//     endTime: () => new Date("February 11, 2018 01:00:00"),
//     isDeleted: () => false,
// });

Consultations.helpers({
    list() {
        return Consultations.findOne(this.consultationID);
    },
    editableBy(userID) {
        return this.list().editableBy(userID);
    }
});