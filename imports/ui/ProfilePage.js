import React from 'react';
import RenderProfilePageMemes from './RenderProfilePageMemes';
import {Memes} from './../api/memes';
import {Button,FormControl} from 'react-bootstrap';
import {Meteor} from 'meteor/meteor';
import {Users} from './../api/users';
import {browserHistory} from 'react-router';
import { Accounts } from 'meteor/accounts-base'

export default class ProfilePage extends React.Component{

  constructor(props){
    super(props);
    //console.log("log: ",Meteor.user().profile.profile_picture);
    this.state={
      currentProfileMemes:[],
      profile_picture: ''
    };
  }



redirectToProfileSettingsPage(){
  browserHistory.push("/settings");
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
    //   <div className="genericform">
    //
    //     <img className="profile_picture_adjustments" src={this.state.profile_picture}/>
    //     <center>
    //     <input  className="fileInput" type="file" onChange={(e) => this._handleImageChange(e)}/>
    //     <button className="button_primary_purple " onClick={(e) => this._handleSubmit(e)}>Upload</button>
    //
    //     <button className="button_success_cyan" onClick={this._resetProfilePhoto.bind(this)}>Reset Photo</button>
    //     </center>
    //
		// <h2>Do you want to change your password?</h2>
		// <form onSubmit={(e)=>this._changePassword(e)}>
		// <center>
		// 	<FormControl className="form_control" style={{width: 350}} type="password" id="oldPassword" placeholder="Enter old password"/>
		// 	<FormControl className="form_control"  style={{width: 350}} type="password" id="newPassword" placeholder="Email new password"/>
		// 	<button className="button_danger_red" type="submit" >Change password</button>
		// </center>
		// </form>
    <div>

    <div className="genericform">
      <img className="profile_picture_adjustments" src={this.state.profile_picture}/>
    </div>

        <center>
          <button className="button_primary_purple"  onClick={this.redirectToProfileSettingsPage.bind(this)} >Profile settings</button>
          <h1>What's up! Here are your memes:</h1></center>
        <RenderProfilePageMemes currentProfileMemes={this.state.currentProfileMemes}/>
        <center><button className="button_primary_purple" onClick={()=>{browserHistory.push("/startpage")}}>Go back to startpage!</button></center>
      </div>
    );
  }
}
