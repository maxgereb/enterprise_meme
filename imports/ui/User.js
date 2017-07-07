import React from 'react';
import PropTypes from 'prop-types';

import {Tracker} from 'meteor/tracker';

import {Image, Button, FormControl} from 'react-bootstrap';
export default class User extends React.Component {

  followUser(user){

    console.log("kfo ima tuka ", Meteor.user().profile.friendsList);
    var isAlreadyFriend = Meteor.user().profile.friendsList.some(function(element) {
        return element._id == user._id;
      });
    if(isAlreadyFriend){
      alert("You already have this user as friend");
    }else{
      Meteor.users.update(Meteor.userId(), { $addToSet: { 'profile.friendsList': user } });
    }


  }

  render() {
    return (
      <div>
        <figure className="friend_box"  >
          <img src={this.props.currentUser.profile.profile_picture} alt="profile-sample1" className="background" />
          <img src={this.props.currentUser.profile.profile_picture} alt="profile-sample1" className="profile" />
          <figcaption>
            <h3>{this.props.currentUser.profile.givenName}<span>Followed</span></h3>
            <div className="icons"><a onClick={()=>{
              this.followUser(this.props.currentUser)}}><i className="ion-social-reddit-outline"></i></a><a href="#"> <i className="ion-social-twitter-outline"></i></a><a href="#"> <i className="ion-social-vimeo-outline"></i></a></div>
          </figcaption>
        </figure>

      </div>






    );
  }
}
