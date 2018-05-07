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

        console.log(userID);
        console.log(data);

        Meteor.users.rawCollection().find({ _id: userID }, Meteor.bindEnvironment((err, cursor) => {
            if (cursor) {
                cursor.toArray((err, user) => {
                    if (user) {
                        console.log('user: ', user);
                        let name = '';
                        if (user[0].profile.name) {
                            name = user[0].profile.name;
                        } else {
                            name = user[0].profile.last_name;
                        }
                        console.log('name: ', name);
                        console.log('data: ', data);
                        Logs.insert({
                            user: name,
                            date: data.date,
                            description: data.description,
                        }, Meteor.bindEnvironment((error) => console.log(error)));
                    }
                })
            }
        }));
    }
});