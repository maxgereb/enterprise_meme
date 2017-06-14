import React from 'react';
import RenderProfilePageMemes from './RenderProfilePageMemes';
import {Memes} from './../api/memes';
import {Button} from 'react-bootstrap';
import {Meteor} from 'meteor/meteor';
import {Users} from './../api/users';
import {browserHistory} from 'react-router';

export default class ProfilePage extends React.Component{

  constructor(props){
    super(props);
    //console.log("log: ",Meteor.user().profile.profile_picture);
    this.state={
      currentProfileMemes:[],
      profile_picture: ''
    };
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

  _handleSubmit(event) { //this function is called whenever a file was dropped in your dropzone
    event.preventDefault();



    if (this.state.profile_picture) {
      console.log("LOGNAV");
      let FR = new FileReader();
      FR.onload = (data) => {

      Meteor.users.update(Meteor.userId(), { $set: { 'profile.profile_picture': data.target.result } });
        // Memes.insert({
        //   memeImage: data.target.result,
        //   uploaderId: "this.state.uploaderId",
        //   uploaderName: "this.state.uploaderName",
        //   description: "this.state.description",
        //   hashtags:" this.state.hashtags",
        //   votes:0
        // });
        alert("Upload successful!");
        browserHistory.push('/startPage');
      }
      FR.readAsDataURL(this.state.profile_picture);
    }

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
  render(){

    return(
      <div className="genericform">

        <img className="profile_picture_adjustments" onClick={(e) => this._handleSubmit(e)} src={this.state.profile_picture}/>
        <center><input className="fileInput" type="file" onChange={(e) => this._handleImageChange(e)}/></center>
        <h1>Hello Maina ! Here are your memes:</h1>
        <RenderProfilePageMemes currentProfileMemes={this.state.currentProfileMemes}/>
        <center><Button bsSize="large" bsStyle="primary" onClick={()=>{browserHistory.push("/startpage")}}>Go back to startpage!</Button></center>
      </div>
    );
  }
}
