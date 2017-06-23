import React from 'react';
import RenderProfilePageMemes from './RenderProfilePageMemes';
import {Memes} from './../api/memes';
import {Button, FormControl} from 'react-bootstrap';
import {Meteor} from 'meteor/meteor';
import {Users} from './../api/users';
import {browserHistory} from 'react-router';
import {Accounts} from 'meteor/accounts-base'
import Navigationbar from './Navigationbar';

export default class ProfileSettings extends React.Component {



    constructor(props){
      super(props);
      //console.log("log: ",Meteor.user().profile.profile_picture);
      this.state={
        currentProfileMemes:[],
        profile_picture: ''
      };
    }


    _handleChangeSettings(event){
        event.preventDefault();
        if(event.target.name.value!='' || event.target.surname.value!=''){
            this._changeUserName(event);
        }
        if(event.target.newPassword.value!='' && event.target.oldPassword.value!=''){
            this._changePassword(event);
        }
    }


    _changeUserName(event){
        var name = event.target.name.value;
        var surname = event.target.surname.value
        Meteor.users.update(Meteor.userId(), { $set: { 'profile.givenName': name,
                                                            'profile.surname':surname} });
        event.target.name.value='';
        event.target.surname.value='';
    }


    _handleImageChange(e) {
    e.preventDefault();


    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {

      this.setState({profile_picture: file});
    }

    reader.readAsDataURL(file)

    }

    _handleSubmit(event) {
    event.preventDefault();

    if((typeof this.state.profile_picture)=="string"){
      alert("There is no meme loaded !")
    }else if (this.state.profile_picture) {
      console.log("LOGNAV");
      let FR = new FileReader();
      FR.onload = (data) => {

      Meteor.users.update(Meteor.userId(), { $set: { 'profile.profile_picture': data.target.result } });

        alert("Upload successful!");
        browserHistory.push('/profile');
      }

      FR.readAsDataURL(this.state.profile_picture);
    }

    }
    _resetProfilePhoto(){
     Meteor.users.update(Meteor.userId(), { $set: { 'profile.profile_picture': "https://upliterate01static.s3.amazonaws.com/media/media/images/avatars/Anonymous_avatar_2015-11-21_165159.9017010000.png" } });

    }
    componentDidMount(){
    this.profilePictureTracker = Tracker.autorun(()=>{

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
          event.target.name.value='';
          event.target.surname.value='';
      }
    });
    }

  render() {
    return (
      <div className="genericform">
      <div><Navigationbar/></div>

        <img className="profile_picture_adjustments" src={this.state.profile_picture}/>
        <center>
          <input className="fileInput" type="file" onChange={(e) => this._handleImageChange(e)}/>
          <button className="button_primary_purple " onClick={(e) => this._handleSubmit(e)}>Upload</button>

          <button className="button_success_cyan" onClick={this._resetProfilePhoto.bind(this)}>Reset Photo</button>
        </center>

        <h2>Do you want to change your settings?</h2>
        <form onSubmit={(e) => this._handleChangeSettings(e)}>
          <center>

            <FormControl className="form_control" style={{
              width: 350
            }} type="text" id="name" placeholder="Enter new name"/>

            <FormControl className="form_control" style={{
              width: 350
            }} type="text" id="surname" placeholder="Enter new surname"/>

            <FormControl className="form_control" style={{
              width: 350
            }} type="password" id="oldPassword" placeholder="Enter old password"/>

            <FormControl className="form_control" style={{
              width: 350
            }} type="password" id="newPassword" placeholder="Enter new password"/>



            <button className="button_primary_purple" onClick={()=>{browserHistory.push("/profile")}}>Go back to profile</button>
            <button className="button_danger_red" type="submit">Save changes</button>

          </center>
        </form>



      </div>
      );
    }
}
