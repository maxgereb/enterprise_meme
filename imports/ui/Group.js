import React from 'react';
import Friend from './Friend';
import {Meteor} from 'meteor/meteor';
import {Users} from './../api/users';
import {Memes} from './../api/memes';
import {browserHistory} from 'react-router';
import { Accounts } from 'meteor/accounts-base'
import {Groups} from './../api/groups.js';
import Meme from './Meme';
import {
  Button,
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  MenuItem,
  FormGroup,
  FormControl,
  ButtonGroup,
  DropdownButton
} from 'react-bootstrap';
export default class Group extends React.Component{
	_renderUploadForm(){
		var userId = Meteor.userId();
		if(this.props.group.users.includes(userId)){
			/*return(
				<div>

					  
					  <form onSubmit={(e) => this._uploadMemeToGroup(e)}>
						<center>
						<div>
						    <FormControl className="form_control" style={{width: 350}} type="text" id="descriptionOfMeme" placeholder="Add meme by description"/>
						
						<Button bsStyle="primary" type="submit">Upload Meme</Button>
						</div>
						</center>
						
					  </form>
				</div>
			);
			*/
			return(<div>
					<DropdownButton title="Show members" >
					{this._renderMembers()}
					</DropdownButton>
					
				</div>);
		}else{
			return(
				<div>
					 <Button bsStyle="success" onClick={(e)=>this._joinGroup(e)}>Join</Button>
				</div>
			);
		}
	}
	_renderMembers(){
		return this.props.group.users.map((memberId)=>{
			var memberNames="";
			var user = Meteor.users.find({_id:memberId}).fetch()[0];
			console.log(user);
			console.log(user.givenName);
			memberNames+=user.profile.givenName;
			memberNames+=" ";
			memberNames+=user.profile.surname;
			
			return(<MenuItem eventKey="1">{memberNames}</MenuItem>)
		});
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
	_uploadMemeToGroup(event){
		event.preventDefault();
		console.log(event.target.descriptionOfMeme.value);
		var desc = event.target.descriptionOfMeme.value;
		if(desc){
			var filteredMemes = Memes.find({description: desc}).fetch();
			if(filteredMemes.length>0&&!this.props.group.memes.includes(filteredMemes[0]._id)){
				Groups.update(this.props.group._id,{
					$push: {
						memes: filteredMemes[0]._id
					}
				});
			}else{alert("No such meme or meme already in group!")}
		}
	}
	_renderGroupMemes(){
		if(this.props.group.users.includes(Meteor.userId())){
			if(this.props.group.memes.length>0){
			return this.props.group.memes.map((memeId)=>{
				var meme = Memes.find({_id:memeId}).fetch()[0];
				return(
				<div>
				<Meme meme={meme} group={this.props.group}/>

				</div>
			);}
				
				);
			}else{
				return(<div><h3>No memes posted :( </h3></div>);
			}

		}
	}
	_renderButtons(){
		if(this.props.group.users.includes(Meteor.userId())){
			return(<div>
			<ButtonGroup>
			  <Button bsStyle="warning" onClick={(e)=>this._leaveGroup(e)}>Leave</Button>
			  <Button bsStyle="danger" onClick={(e)=>this._deleteGroup(e)}>DELETE GROUP</Button>
			</ButtonGroup>
			</div>);
		}
	}
    render(){

      return(
        <div className="item">
          <h1>{this.props.group.name}</h1>
		  <br/>


		  {this._renderUploadForm()}
		  {this._renderGroupMemes()}
		  <br/>
	      {this._renderButtons()}

       </div>
      );
    }
  }
