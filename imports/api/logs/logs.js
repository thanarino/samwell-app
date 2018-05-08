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

        Meteor.users.rawCollection().find({ _id: userID }, Meteor.bindEnvironment((err, cursor) => {
            if (cursor) {
                cursor.toArray(Meteor.bindEnvironment((err, user) => {
                    if (user) {
                        let name = '';
                        if (user[0].profile.name) {
                            name = user[0].profile.name;
                        } else {
                            name = user[0].profile.last_name;
                        }
                        Logs.insert({
                            user: name,
                            date: data.date,
                            description: data.description,
                        }, (error) => console.log(error));
                    }
                }))
            }
        }));
    }
});