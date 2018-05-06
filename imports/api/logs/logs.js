import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Logs = new Mongo.Collection('logs');

if (Meteor.isServer) {
    Meteor.publish('logs', function logsPublication() {
        return Logs.find();
    });
}

Meteor.methods({
    'logs.insert'(userID, data) {
        check(userID, String);
        check(data, {
            date: Date,
            description: String,
        });

        Logs.insert({
            userID,
            date,
            description,
        }, (error) => console.log(error));
    }
});