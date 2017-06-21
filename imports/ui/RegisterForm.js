import React from 'react';
import PropTypes from 'prop-types';
import {Users} from './../api/users';
import {Accounts} from 'meteor/accounts-base';
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
export default class RegisterForm extends React.Component {
  redirectToLogin() {
    browserHistory.push('/');
  };
  handleRegister(event) {
    /* Extracting user data */
    let email = event.target.email.value;
    let password = event.target.password.value;
    let name = event.target.name.value;
    event.preventDefault();

    /* Handle empty fields */

    console.log(email, " ", password);
    /* Clears input fields */

    event.target.email.value = '';
    event.target.password.value = '';
    event.target.name.value='';
    Accounts.createUser({
      email,
      password,
      profile: {
            profile_picture:"https://upliterate01static.s3.amazonaws.com/media/media/images/avatars/Anonymous_avatar_2015-11-21_165159.9017010000.png",
            givenName: name,
            surname: 'Doe',
            gender: 'M',
            friendsList: []
        }
    }, (err) => {
      console.log("User", email, "created");

    });

  }
  render() {
    return (
      <div className="wrapper my_form">
        <img src="https://cdn4.iconfinder.com/data/icons/people-std-pack/512/guy-512.png"/>
        <form onSubmit={this.handleRegister}>

          <div>
            <FormControl type="name" id="name" placeholder="Name"/>
          </div>
          <FormControl type="email" id="email" placeholder="Email"/>
          <div>
            <FormControl type="password" id="password" placeholder="Password"/>
          </div>

          <div className="wrapper__button">
            <Button type="submit" bsStyle="success" bsSize="medium">
              Register
            </Button>

          </div>
        </form>
        <div className="wrapper__button">
          <center>
            <Button onClick={this.redirectToLogin.bind(this)} bsStyle="danger" bsSize="medium">
              You already have an account?
            </Button>
          </center>
        </div>
      </div>
    );
  }

}
