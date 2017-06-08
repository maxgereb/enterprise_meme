import React from 'react';
import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
import ReactDOM from 'react-dom';
import Navigationbar from './Navigationbar';
import MemeList from './MemeList';
import UploadImageComponent from './UploadImageComponent';
import Images from './../api/memes';
import Blaze from 'meteor/gadicc:blaze-react-component';
import {Template} from 'meteor/templating';

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
        <div><MemeList memes={[1, 2]}/></div>

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
