 import React from 'react';
 import ReactDOM from 'react-dom';
 import {Meteor} from 'meteor/meteor';
 import {Router,Route,browserHistory} from 'react-router';
 import {Tracker} from 'meteor/tracker';

 import StartPage from './../imports/ui/StartPage';
 import LoginForm from './../imports/ui/LoginForm';
 import RegisterForm from './../imports/ui/RegisterForm';


 const unauthenticatedPages = ['/','/register'];
 const authencticatedPages = ['/startPage'];

 const routes = (
   <Router history={browserHistory}>
     <div>
       <Route path="/register" component={RegisterForm}/>
       <Route path="/" component = {LoginForm}/>
      <Route path="/startPage" component={StartPage}/>
     </div>
   </Router>
 );

 Tracker.autorun(()=>{
   const isAuthenticated = !!Meteor.userId(); //Convert string to boolean
   const pathName = browserHistory.getCurrentLocation().pathname;
   const isUnauthenticatedPage = unauthenticatedPages.includes(pathName);
   const isAuthenticatedPage = authencticatedPages.includes(pathName);

   // Redirect to the links page
   if(isAuthenticated && isUnauthenticatedPage){
     browserHistory.push('/startPage');
     console.log('pushvame pathName-a');
   }else if(!isAuthenticated && isAuthenticatedPage){
     browserHistory.push('/');
   }
   console.log('isAuthenticated', isAuthenticated);


 });

 Meteor.startup(()=>{
   ReactDOM.render(routes,document.getElementById('main'));
 });
