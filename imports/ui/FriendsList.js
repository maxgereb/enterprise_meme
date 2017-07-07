import React from 'react';
import Friend from './Friend';
import {Meteor} from 'meteor/meteor';
import {Users} from './../api/users';
import {browserHistory} from 'react-router';
import { Accounts } from 'meteor/accounts-base'
import Navigationbar from './Navigationbar';
import {Row,Col,Image, Button, FormControl} from 'react-bootstrap';


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
      if(this.state.myFriends.length==0){
        return (
          <div>
            <center>
            <h2> You don't have any friends yet!</h2>
            </center>
          </div>
        );
      }
      return this.state.myFriends.map((friend)=>{


        return (
          <div>
            <Col xs={12} md={6} lg={3}>
              <Friend friend={friend}/>
            </Col>
          </div>
        );


      });
    }
    render(){
      return(
        <div>
          <Navigationbar/>

          <center>

            <div className="all_directions_distance">

              {this.renderAllFriends()}
            </div>
          </center>

       </div>
      );
    }
  }
