import React from 'react';
import RenderProfilePageMemes from './RenderProfilePageMemes';
import {Memes} from './../api/memes';
import {Button, FormControl} from 'react-bootstrap';
import {Meteor} from 'meteor/meteor';
import {Users} from './../api/users';
import {browserHistory} from 'react-router';
import {Accounts} from 'meteor/accounts-base'
import Navigationbar from './Navigationbar';

export default class ProfileMemes extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      currentProfileMemes: []
    };
  }

  redirectToProfileSettingsPage() {
    browserHistory.push("/settings");
  }
  componentDidMount() {

    this.memesTracker = Tracker.autorun(() => {
      const currentProfileMemes = Memes.find({uploaderId: Meteor.userId()}).fetch();
      this.setState({currentProfileMemes});
    });
  }
  componentWillUnmount() {
    this.memesTracker.stop();

  }

  render() {

    return (
      <div>


      <div><Navigationbar /></div>



          <div className="profilepage_meme_container">
                <h3> Here are your uploaded Memes </h3>

          </div>
          <RenderProfilePageMemes currentProfileMemes={this.state.currentProfileMemes}/>
          <center><button className="button_primary_purple" onClick={()=>{browserHistory.push("/startpage")}}>Go back to startpage!</button></center>
        </div>

      );
}}
