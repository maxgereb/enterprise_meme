import {Meteor} from 'meteor/meteor';
import {Memes} from './../imports/api/memes.js';
import {Groups} from './../imports/api/groups.js';
Meteor.startup(() => {

  console.log("Server started ", Memes.find().fetch().length);
  Houston.add_collection(Meteor.users);
});
