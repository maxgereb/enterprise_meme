import React from 'react';
import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
import * as ReactBootstrap from 'react-bootstrap';
import ReactDOM from 'react-dom';
import Navigationbar from './Navigationbar';
import {
  Button,
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  MenuItem
} from 'react-bootstrap';
export default class StartPage extends React.Component {

  handleLogout() {
    Accounts.logout();
  }
  render() {
    return (

      <div>
        <div><Navigationbar/></div>
        <div className="wrapper">
          <Button onClick={this.handleLogout.bind(this)} bsStyle="primary" bsSize="large">
            Logout</Button>
        </div>

      </div>
    );
  }
}
