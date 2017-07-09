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

export default class FreshPage extends React.Component {
  constructor(props) {
	
    super(props);

    this.state = {
      memes: []
	
    };
    this.searchStateChange = this.searchStateChange.bind(this);

	
  }

  componentDidMount() {
    this.memesTracker = Tracker.autorun(() => {
    var memes = Memes.find().fetch();
	var currentIndex=memes.length ;
	while (0 !== currentIndex) {
			// Pick a remaining element...
			var randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			var temporaryValue = memes[currentIndex];
			memes[currentIndex] = memes[randomIndex];
			memes[randomIndex] = temporaryValue;
		  }
	
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

        <div><Navigationbar  changeStartpageState={this.searchStateChange}/></div>

        <div><MemeList currentMemeList={this.state.memes}/></div>

        <center>

          <div>
            <button className="button_primary_purple" onClick={this.handleLogout.bind(this)}>
              Logout</button>
          </div>
        </center>

      </div>
    );
  }
}
