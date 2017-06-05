 import React from 'react';
 import ReactDOM from 'react-dom';
 import {Meteor} from 'meteor/meteor';
 import StartPage from './../imports/ui/StartPage';
 import LoginForm from './../imports/ui/LoginForm';
 import RegisterForm from './../imports/ui/RegisterForm';
 import {Router,Route,browserHistory} from 'react-router';

 const routes = (
   <Router history={browserHistory}>
     <div>
       <Route path="/register" component={RegisterForm}/>
       <Route path="/" component = {LoginForm}/>
      <Route path="/startPage" component={StartPage}/>
     </div>
   </Router>
 );

 Meteor.startup(()=>{
   ReactDOM.render(routes,document.getElementById('main'));
 });
