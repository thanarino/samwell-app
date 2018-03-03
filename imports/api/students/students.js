import { Mongo } from 'meteor/mongo';
import { Factory } from 'meteor/dburles:factory';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import faker from 'faker';

class StudentsCollection extends Mongo.Collection {
    insert(doc, callback) {
        const ourDoc = doc;
        ourDoc.createdAt = ourDoc.createdAt || new Date();
        ourDoc.isDeleted = false;
        let nextNumber = 1;
        while (this.findOne({ studentID: nextNumber })) {
            nextNumber = nextNumber++;
        }
        ourDoc.studentID = nextNumber.toString();
        return super.insert(ourDoc, callback);
    }
}

export const Students = new StudentsCollection('Students');

Students.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; }
});

Students.schema = new SimpleSchema({
    studentID: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        denyUpdate: true,
    },
    createdAt: {
        type: Date,
        denyUpdate: true,
    },
    name: {
        type: String,
    },
    studentNumber: {
        type: String,
        max: 10,
    },
    subjects: {
        // list of IDs of sections
        type: [String],
    },
    //@TODO: add facebook fields    
});

Students.attachSchema(Students.schema);

Students.publicFields = {
    studentID: 1,
    name: 1,
    createdAt: 1,
    studentNumber: 1,
    subjects: 1,
};

Students.helpers({
    list() {
        return Students.findOne(this.studentID);
    },
    editableBy(userID) {
        return this.list().editableBy(userID);
    }
})