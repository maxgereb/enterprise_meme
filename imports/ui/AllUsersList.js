import React from 'react';
import {Button,FormControl} from 'react-bootstrap';
import {Meteor} from 'meteor/meteor';
import {Users} from './../api/users';
import {browserHistory} from 'react-router';
import { Accounts } from 'meteor/accounts-base'
import Navigationbar from './Navigationbar';
import User from './User';

export default class AllUsersList extends React.Component{

  constructor(props){
    super(props);

    this.state={
      allUsers:[]
    };
  }




  componentDidMount(){

    this.usersTracker=Tracker.autorun(()=>{
      console.log("Kolko chesto vikam tracker useri");
      const allUsers = Meteor.users.find({}).fetch();
      console.log("Kolko chesto vikam tracker useri ",allUsers);
      this.setState({allUsers});
    });
  }
  componentWillUnmount(){
    this.usersTracker.stop();

  }




  renderAllUsers(){
    console.log("kolko user ",this.state.allUsers.length);
    return this.state.allUsers.map((user)=>{
      return (
        <div>
          <User key={user._id} currentUser={user}/>
        </div>
      );
    });
  }
  render(){
    return(
      <div>
        <Navigationbar/>

          <center>

           <h1>All users tuka </h1>

           {this.renderAllUsers()}

        </center>

     </div>
    );
  }
}
