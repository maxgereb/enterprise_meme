import {Meteor} from 'meteor/meteor';
import {Memes} from './../imports/api/memes.js';

Meteor.startup(() => {

  console.log("Server started ", Memes.find().fetch().length);
});
