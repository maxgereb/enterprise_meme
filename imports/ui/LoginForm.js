import React from 'react';
import PropTypes from 'prop-types';
import {Users} from './../api/users';
import {Meteor} from 'meteor/meteor';
import {browserHistory} from 'react-router';
import {
  Button,
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  MenuItem,
  FormControl
} from 'react-bootstrap';

export default class LoginForm extends React.Component {

  redirectToRegister() {
    browserHistory.push('/register');
  };
  handleLogin(event) {

    /* Extracting user data */
    let userEmail = event.target.email.value;
    let password = event.target.password.value;
    event.preventDefault();
    console.log(userEmail, " ", password);

    Meteor.loginWithPassword({
      email: userEmail
    }, password, (err) => {
      if (Meteor.userId()) {
        browserHistory.replace('/startPage');
      }else{
		  alert("Wrong email or password!")

	  }

    });

  }

  render() {
    return (
      <div className="wrapper my_form">
        <img src="https://cdn4.iconfinder.com/data/icons/people-std-pack/512/guy-512.png"/>
        <form onSubmit={this.handleLogin.bind(this)}>
          <div>
            <FormControl type="text" id="email" placeholder="Email"/>
          </div>
          <div>
            <FormControl type="password" id="password" placeholder="Password"/>
          </div>
          <div className="wrapper__button">
            <Button type="submit" bsStyle="success" bsSize="medium">
              Login
            </Button>
          </div>
        </form>
        <div className="wrapper__button">
          <center>
            <Button onClick={this.redirectToRegister.bind(this)} type="submit" bsStyle="danger" bsSize="medium">
              You don't have an account?
            </Button>
          </center>

        </div>

      </div>

    );
  }
}
