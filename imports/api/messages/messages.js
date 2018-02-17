import { Mongo } from 'meteor/mongo';
import { Factory } from 'meteor/dburles:factory';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import faker from 'faker';

class MessagesCollection extends Mongo.Collection {
    insert(doc, callback) {
        const ourDoc = doc;
        ourDoc.createdAt = ourDoc.createdAt || new Date();
        ourDoc.isDeleted = false;
        let nextNumber = 1;
        while (this.findOne({ messageID: nextNumber })) {
            nextNumber = nextNumber++;
        }
        ourDoc.messageID = nextNumber.toString();
        return super.insert(ourDoc, callback);
    }
}

export const Messages = new MessagesCollection('Messages');

Messages.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
});

Messages.schema = new SimpleSchema({
    messageID: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        denyUpdate: true,
    },
    createdAt: {
        type: Date,
        denyUpdate: true,
    },
    messageBody: {
        type: String,
        max: 5000,
        denyUpdate: true,
    },
    senderID: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        denyUpdate: true,
    },
    receiverID: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        denyUpdate: true,
    },
    sectionID: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        denyUpdate: true,
    },
    isDeleted: {
        type: Boolean,
    }
});

Messages.attachSchema(Messages.schema);

Messages.publicFields = {
    messageID: 1,
    createdAt: 1,
    messageBody: 1,
    senderID: 1,
    receiverID: 1,
    sectionID: 1,
    isDeleted: 1,
};

// figure out user schema first
// Factory.define('message', Messages, {
//     messageID: () => 1,
//     createdAt: () => new Date(),
//     messageBody: () => faker.lorem.sentence(),
//     senderID: () => Factory.get('user'),
//     receiverID: () => Factory.get('user'),
//     sectionID: () => Factory.get('section'),
//     isDeleted: () => false,
// });

Messages.helpers({
    list() {
        return Messages.findOne(this.messageID);
    },
    editableBy(userID) {
        return this.list().editableBy(userID);
    }
});