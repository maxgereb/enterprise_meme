import React from 'react';
import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
import ReactDOM from 'react-dom';
import Navigationbar from './Navigationbar';
import MemeList from './MemeList';
//import UploadImageComponent from './UploadImageComponent';
import {Memes} from './../api/memes';
import {browserHistory} from 'react-router';
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
  constructor(props) {
    super(props);
    this.state = {
      memes: []
    };
    this.searchStateChange = this.searchStateChange.bind(this);
  }

  componentDidMount() {
    this.memesTracker = Tracker.autorun(() => {
      const memes = Memes.find({}, {
        sort: {
          votes: -1
        }
      }).fetch();
      this.setState({memes});
    });
  }
  componentWillUnmount() {
    this.memesTracker.stop();
  }
  searchStateChange(filteredMemes) {
    console.log("she smenqme li");
    this.setState({memes: filteredMemes});
  }
  handleLogout() {
    Accounts.logout();
    browserHistory.replace('/');
  }
  render() {

    return (

      <div className="genericform">

        <div><Navigationbar changeStartpageState={this.searchStateChange}/></div>

        <div><MemeList currentMemeList={this.state.memes}/></div>

        <center>

          <div>
            <Button onClick={this.handleLogout.bind(this)} bsStyle="primary" bsSize="large">
              Logout</Button>
          </div>
        </center>

      </div>
    );
  }
}
