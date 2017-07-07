import React from 'react';

import {Meteor} from 'meteor/meteor';
import {Users} from './../api/users';
import {browserHistory} from 'react-router';
import { Accounts } from 'meteor/accounts-base'
import Navigationbar from './Navigationbar';
import User from './User';
import {Row,Col,Image, Button, FormControl} from 'react-bootstrap';

export default class AllUsersList extends React.Component{

  constructor(props){
    super(props);

    this.state={
      allUsers:[]
    };
  }





  componentDidMount(){

    this.usersTracker=Tracker.autorun(()=>{
      //console.log("Kolko chesto vikam tracker useri");
      const allUsers = Meteor.users.find({}).fetch();
      console.log("Kolko chesto vikam tracker useri ",allUsers);
      this.setState({allUsers});
    });
  }
  componentWillUnmount(){
    this.usersTracker.stop();

  }


  // followUser(user){
  //
  //   console.log("kfo ima tuka ", Meteor.user().profile.friendsList);
  //   var isAlreadyFriend = Meteor.user().profile.friendsList.some(function(element) {
  //       return element._id == user._id;
  //     });
  //   if(isAlreadyFriend){
  //     alert("You already have this user as friend");
  //   }else{
  //     Meteor.users.update(Meteor.userId(), { $addToSet: { 'profile.friendsList': user } });
  //   }
  //
  //
  // }

  renderAllUsers(){
    console.log("kolko user ",this.state.allUsers.length);
    return this.state.allUsers.map((user)=>{

      /* Don't show my profile only other users */
      if(user._id!=Meteor.userId()){
          return (
            <div>
              <Col xs={12} md={6} lg={3}>  <User key={user._id} currentUser={user} /></Col>

              {/* <button className="button_primary_purple simple_border" onClick={()=>{
                this.addToFriends(user);
              }}>Add to Friends</button> */}
            </div>
          );
        }});
      }


  render(){
    return(
      <div>
        <Navigationbar/>

        <center>

          <h1> All users </h1>
          <div>
            <Row>
              {this.renderAllUsers()}
            </Row>
          </div>

        </center>

     </div>
    );
  }
}
