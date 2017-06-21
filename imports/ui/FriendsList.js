import React from 'react';
import Friend from './Friend';
import {Meteor} from 'meteor/meteor';
import {Users} from './../api/users';
import {browserHistory} from 'react-router';
import { Accounts } from 'meteor/accounts-base'
import Navigationbar from './Navigationbar';
export default class FriendsList extends React.Component{

    constructor(props){
      super(props);

      this.state={
        myFriends:[]
      };
    }




    componentDidMount(){

      this.myFriendsTracker=Tracker.autorun(()=>{

        const myFriends = Meteor.user().profile.friendsList;
        console.log("Kolko chesto vikam tracker friends ",myFriends );
        this.setState({myFriends});
      });
    }
    componentWillUnmount(){
      this.myFriendsTracker.stop();

    }




    renderAllFriends(){
      //console.log("kolko user ",this.state.allFriends.length);
      return this.state.myFriends.map((friend)=>{


        return (
          <div className="item">
            <Friend friend={friend}/>
          </div>
        );
      });
    }
    render(){
      return(
        <div>
          <Navigationbar/>

            <center>

             <h1>All friends</h1>

             {this.renderAllFriends()}

          </center>

       </div>
      );
    }
  }
