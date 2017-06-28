import React from 'react';
import Friend from './Friend';
import {Meteor} from 'meteor/meteor';
import {Users} from './../api/users';
import {browserHistory} from 'react-router';
import { Accounts } from 'meteor/accounts-base'
import {Groups} from './../api/groups.js';
import {
  Button,
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  MenuItem,
  FormGroup,
  FormControl
} from 'react-bootstrap';
export default class Group extends React.Component{
	_renderButtons(){
		var userId = Meteor.userId();
		if(this.props.group.users.includes(userId)){
			return(
				<div>
					  <Button bsStyle="warning" onClick={(e)=>this._leaveGroup(e)}>Leave</Button>
					  <Button bsStyle="danger" onClick={(e)=>this._deleteGroup(e)}>DELETE GROUP</Button>
				</div>
			);
		}else{
			return(
				<div>
					 <Button bsStyle="success" onClick={(e)=>this._joinGroup(e)}>Join</Button>
				</div>
			);
		}
	}
	_joinGroup(event){
		event.preventDefault();
		var userId = Meteor.userId();
		if(!this.props.group.users.includes(userId)){
			Groups.update(this.props.group._id,{
				$push: {
					users: userId
				}
			});
		}else{
			alert("You have already joined this group!");
		}
	}
	_leaveGroup(event){
		event.preventDefault();
		var userId = Meteor.userId();
		if(this.props.group.users.includes(userId)){
			Groups.update(this.props.group._id,{
				$pull: {
					users: userId
				}
			});
		}else{
			alert("You are not in the group!");
		}
	}
	_deleteGroup(event){
		event.preventDefault();
		Groups.remove(this.props.group._id);
	}
    render(){

      return(
        <div className="item">
          Group name: {this.props.group.name}
		  <br/>
		  Members: {this.props.group.users}
		  <br/>
		  {this._renderButtons()}
       </div>
      );
    }
  }
