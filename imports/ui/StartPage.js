import React from 'react';
import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
import * as ReactBootstrap from 'react-bootstrap';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';

export default class StartPage extends React.Component {

  handleLogout(){
    Accounts.logout();
  }
  render(){
    return (

      <div>

        <ReactBootstrap.Button onClick={this.handleLogout.bind(this)} bsStyle="success" bsSize="small">
            Logout
        </ReactBootstrap.Button>
      </div>
    );
  }
}
