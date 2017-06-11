import React from 'react';
import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
import ReactDOM from 'react-dom';
import Navigationbar from './Navigationbar';
import MemeList from './MemeList';
import UploadImageComponent from './UploadImageComponent';
import {Memes} from './../api/memes';
import {Template} from 'meteor/templating';
import PropTypes from 'prop-types';
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

        <div><MemeList/></div>

        <center>
          <div className="wrapper"><UploadImageComponent/></div>
          <div>
            <Button onClick={this.handleLogout.bind(this)} bsStyle="primary" bsSize="large">
              Logout</Button>
          </div>
        </center>

      </div>
    );
  }
}
