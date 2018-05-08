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

        let err = false;
        let res = undefined;

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
                        res = user[0];
                        Logs.insert({
                            user: name,
                            date: data.date,
                            description: data.description,
                        }, (error) => {
                            err = true;
                            console.log(error)
                        });
                    } else {
                        err = true;
                    }
                }))
            } else {
                err = true;
            }
        }));

        if (err) {
            throw new Meteor.Error('logs-error', "Logs Error");
        } else {
            return user;
        }
    }
});