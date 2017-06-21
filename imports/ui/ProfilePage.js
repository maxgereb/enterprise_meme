import React from 'react';
import RenderProfilePageMemes from './RenderProfilePageMemes';
import {Memes} from './../api/memes';
import {Button,FormControl} from 'react-bootstrap';
import {Meteor} from 'meteor/meteor';
import {Users} from './../api/users';
import {browserHistory} from 'react-router';
import { Accounts } from 'meteor/accounts-base'
import Navigationbar from './Navigationbar';

export default class ProfilePage extends React.Component{

  constructor(props){
    super(props);
    //console.log("log: ",Meteor.user().profile.profile_picture);
    this.state={
      currentProfileMemes:[],
      profile_picture: ''
    };
  }




  componentDidMount(){
    this.profilePictureTracker = Tracker.autorun(()=>{
      console.log("stana trackercheto");
      const userIsActive = Meteor.user();
      if(Meteor.user()){

          const profile_picture = Meteor.user().profile.profile_picture;
          this.setState({profile_picture});
      }

    });
    this.memesTracker=Tracker.autorun(()=>{
      const currentProfileMemes = Memes.find({uploaderId:Meteor.userId()}).fetch();
      this.setState({currentProfileMemes});
    });
  }
  componentWillUnmount(){
    this.memesTracker.stop();
    this.profilePictureTracker.stop();
  }
  _changePassword(event){
	  event.preventDefault();
	  console.log(event.target.oldPassword.value);
	  console.log(event.target.newPassword.value);
	  Accounts.changePassword(event.target.oldPassword.value, event.target.newPassword.value, function(error) {
		  if (error) {
			alert("Password change failed! Are you sure your current password is correct?");
		  } else {
			alert("Password change successful!");
		  }
		});
  }
  render(){

    return(

    <div>
    <div><Navigationbar /></div>
    <div className="genericform">
      <img className="profile_picture_adjustments" src={this.state.profile_picture}/>
    </div>

        <center>

          <div>
          <button className="button_primary_purple"  onClick={()=>{
            browserHistory.push("/myMemes");
          }} >Uploaded Memes</button>
         </div>


         <div>
         <button className="button_primary_purple" style={{width:150}} onClick={()=>{
           browserHistory.push("/myFriends");
         }}>Friends</button>
         </div>

          <div>
          <button className="button_primary_purple"  onClick={()=>{
            browserHistory.push("/settings");
          }} >Profile settings</button>
          </div>


          <button className="button_primary_purple" onClick={()=>{browserHistory.push("/startpage")}}>Go back to startpage!</button></center>
      </div>
    );
  }
}
