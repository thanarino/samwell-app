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

        Meteor.users.findOne({ _id: userID }, (err, user) => {
            if (user) {
                Logs.insert({
                    user: `${user.profile.name ? `${user.profile.name}` : `${user.profile.last_name}`}`,
                    date: data.date,
                    description: data.description,
                }, (error) => console.log(error));
            }
        });
    }
});