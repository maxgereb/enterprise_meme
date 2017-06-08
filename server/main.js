import {Meteor} from 'meteor/meteor';
import Images from './../imports/api/memes';

Meteor.startup(() => {
  // code to run on server at startup
  Images.allow({
    'insert': function() {
      // add custom authentication code here
      return true;
    }
  });
  console.log("Server started");
});
