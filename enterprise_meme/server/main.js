import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  UserList = new Mongo.Collection('users');

  UserList._ensureIndex({ username: "text", userpassword: "text" }, { unique: true })
});
