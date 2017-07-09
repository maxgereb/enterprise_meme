import React from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import {Router, Route, browserHistory} from 'react-router';
import {Tracker} from 'meteor/tracker';
import { Router as IronRouter} from 'meteor/iron:router'
import ProfilePage from './../imports/ui/ProfilePage';
import StartPage from './../imports/ui/StartPage';
import HotPage from './../imports/ui/Hot';
import FreshPage from './../imports/ui/Fresh';
import LoginForm from './../imports/ui/LoginForm';
import RegisterForm from './../imports/ui/RegisterForm';
import UploadPage from './../imports/ui/UploadPage';
import ProfileMemes from './../imports/ui/ProfileMemes';
import GroupsPage from './../imports/ui/GroupsPage';
import {Memes} from './../imports/api/memes.js';
import {Groups} from './../imports/api/groups.js';
import ProfileSettings from './../imports/ui/ChangeProfileSettings';

import ProfileFriendsPage from './../imports/ui/ProfileFriendsPage';
import FriendsList from './../imports/ui/FriendsList';
export var all_memes = [];
const unauthenticatedPages = ['/', '/register'];
const authencticatedPages = ['/fresh','/hot','/startPage', '/upload','/profile','/myMemes','/myFriends','/groupsPage'];

/* KACHEV IMA MALKA PISHKA */
const onEnterPublicPage = () => {
  /* If logged in and on a public page redirect to startPage */
  if (Meteor.userId()) {
    browserHistory.replace("/startPage");
  }
};

const onEnterPrivatePage = () => {
  /* If NOT logged in and on a private page redirect to the root page */
  if (!Meteor.userId()) {
    browserHistory.replace("/");
  }
};
const routes = (
  <Router history={browserHistory}>
    <div>
      <Route path="/register" component={RegisterForm} onEnter={onEnterPublicPage}/>
	  <Route path="/startPage" component={StartPage} onEnter={onEnterPrivatePage}/>
	  <Route path="/fresh" component={FreshPage} onEnter={onEnterPrivatePage}/>
	  <Route path="/hot" component={HotPage} onEnter={onEnterPrivatePage}/>
      <Route path="/" component={LoginForm} onEnter={onEnterPublicPage}/>
      <Route path="/startPage" component={StartPage} onEnter={onEnterPrivatePage}/>
      <Route path="/upload" component={UploadPage} onEnter={onEnterPrivatePage}/>
      <Route path="/profile" component={ProfilePage} onEnter={onEnterPrivatePage}/>
      <Route path="/settings" component={ProfileSettings} onEnter={onEnterPrivatePage}/>
      <Route path="/myMemes" component={ProfileMemes} onEnter={onEnterPrivatePage}/>
      <Route path="/myFriends" component={FriendsList} onEnter={onEnterPrivatePage}/>
      <Route path="/manageFriends" component={ProfileFriendsPage} onEnter={onEnterPrivatePage}/>

	  <Route path="/groupsPage" component={GroupsPage} onEnter={onEnterPrivatePage}/>
    </div>
  </Router>
);


Meteor.startup(() => {

  Tracker.autorun(() => {

    const isAuthenticated = !!Meteor.userId(); //Convert string to boolean
    const pathName = browserHistory.getCurrentLocation().pathname;
    const isUnauthenticatedPage = unauthenticatedPages.includes(pathName);
    const isAuthenticatedPage = authencticatedPages.includes(pathName);
    console.log("PATHNAME ", pathName);
    // Redirect to the links page
    if (isAuthenticated && isUnauthenticatedPage) {

      browserHistory.replace('/startPage');
    } else if (!isAuthenticated && isAuthenticatedPage) {

      browserHistory.replace('/');
    }
    console.log('isAuthenticated', isAuthenticated);

    ReactDOM.render(routes, document.getElementById('main'));

  });
  setInterval(function(){
		console.log("contentGen");
		var faker = require('faker');
		var randomImg = faker.image.image();
		var randomDescription = faker.lorem.word();
		Memes.insert({
          memeImage: randomImg,
          uploaderId: "0000",
          uploaderName: "contentGenerator",
          description: randomDescription,
          hashtags: ["#fake" ,"#meme"],
          votes: 0,
		  comments: [],
		  upvotes: []
        });

  }, 6000000);
	IronRouter.route('(.*)', function () {
	//do nothing
	});
});
