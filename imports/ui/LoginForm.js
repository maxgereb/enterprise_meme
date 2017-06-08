import React from 'react';
import PropTypes from 'prop-types';
import {Users} from './../api/users';
import {Meteor} from 'meteor/meteor';
import {browserHistory} from 'react-router';
import {Button} from 'react-bootstrap';

export default class LoginForm extends React.Component {

  redirectToRegister() {
    browserHistory.replace('/register');
  };
  handleLogin(event) {

    /* Extracting user data */
    let userEmail = event.target.email.value;
    let password = event.target.password.value;
    event.preventDefault();
    console.log(userEmail, " ", password, "dadadadadadaad");

    Meteor.loginWithPassword({
      email: userEmail
    }, password, (err) => {
      if (Meteor.userId()) {
        browserHistory.replace('/startPage');
      }

    });

  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleLogin.bind(this)}>
          <div>
            <input type="text" id="email" placeholder="Email"/>
          </div>
          <div>
            <input type="password" id="password" placeholder="Password"/>
          </div>
          <div>
            <Button type="submit" bsStyle="success" bsSize="medium">
              Login
            </Button>
          </div>
        </form>
        <div className="wrapper">
          <Button onClick={this.redirectToRegister.bind(this)} type="submit" bsStyle="danger" bsSize="medium">
            You don't have an account?
          </Button>
        </div>

      </div>

    );
  }
}
