import React from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import {Router, Route, browserHistory} from 'react-router';
import {Tracker} from 'meteor/tracker';

import StartPage from './../imports/ui/StartPage';
import LoginForm from './../imports/ui/LoginForm';
import RegisterForm from './../imports/ui/RegisterForm';
import {Memes} from './../imports/api/memes.js';

export var all_memes = [];
const unauthenticatedPages = ['/', '/register'];
const authencticatedPages = ['/startPage'];

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
      <Route path="/" component={LoginForm} onEnter={onEnterPublicPage}/>
      <Route path="/startPage" component={() => (<StartPage all_memes={all_memes}/>)} onEnter={onEnterPrivatePage}/>
    </div>
  </Router>
);

Meteor.startup(() => {

  Tracker.autorun(() => {
    all_memes = Memes.find().fetch();
    console.log("shithead ", all_memes.length);
    ReactDOM.render(routes, document.getElementById('main'));
  });

  Tracker.autorun(() => {

    const isAuthenticated = !!Meteor.userId(); //Convert string to boolean
    const pathName = browserHistory.getCurrentLocation().pathname;
    const isUnauthenticatedPage = unauthenticatedPages.includes(pathName);
    const isAuthenticatedPage = authencticatedPages.includes(pathName);

    // Redirect to the links page
    if (isAuthenticated && isUnauthenticatedPage) {

      browserHistory.replace('/startPage');
    } else if (!isAuthenticated && isAuthenticatedPage) {
      browserHistory.replace('/');
    }
    console.log('isAuthenticated', isAuthenticated);

    ReactDOM.render(routes, document.getElementById('main'));

  });
});
