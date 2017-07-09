import React from 'react';
import PropTypes from 'prop-types';

import {Tracker} from 'meteor/tracker';

import {Image, Button, FormControl} from 'react-bootstrap';
export default class User extends React.Component {
  checkIfIsAFriend(user){
    var isAlreadyFriend = Meteor.user().profile.friendsList.some(function(element) {
        return element._id == user._id;
      });
        if(isAlreadyFriend){
          console.log("veche followam");
          return("Following");
        }else{
          return("Not following");

        }

}

  followUser(user){

    console.log("kfo ima tuka ", Meteor.user().profile.friendsList);
    var isAlreadyFriend = Meteor.user().profile.friendsList.some(function(element) {
        return element._id == user._id;
      });
    if(isAlreadyFriend){
      alert("You already have this user as friend");
    }else{
      alert("You are now following: \""+user.profile.givenName+"\". Enjoy ")
      Meteor.users.update(Meteor.userId(), { $addToSet: { 'profile.friendsList': user } });
    }


  }


    unFollowUser(user){


      var isAlreadyFriend = Meteor.user().profile.friendsList.some(function(element) {
          return element._id == user._id;
        });
      if(!isAlreadyFriend){
        alert("You can't unfollow someone you are not following. That's fairly obvious, so maybe u are dumb.");
      }else{
        console.log("vikam pishka");
        Meteor.users.update(Meteor.userId(), { $pull: { 'profile.friendsList': user } });
      }


    }


  render() {
    return (
      <div>
        <figure className="friend_box"  >
          <img src={this.props.currentUser.profile.profile_picture} alt="profile-sample1" className="background" />
          <img src={this.props.currentUser.profile.profile_picture} alt="profile-sample1" className="profile" />
          <figcaption>
            <h3>{this.props.currentUser.profile.givenName}<span>{this.checkIfIsAFriend(this.props.currentUser)}</span></h3>
            <div className="icons"><a onClick={()=>{
              this.followUser(this.props.currentUser)}}>
              <i className="ion-person-add"></i></a>

              <a onClick={()=>{
                this.unFollowUser(this.props.currentUser)}}>
                <i className="ion-hammer"></i></a>
            </div>
          </figcaption>
        </figure>

      </div>






    );
  }
}
