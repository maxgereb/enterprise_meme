import React from 'react';
import PropTypes from 'prop-types';
import {Image, Button, FormControl, ButtonGroup,DropdownButton,MenuItem} from 'react-bootstrap';
import {Memes} from './../api/memes.js';
import {Router} from 'react-router';
import {Meteor} from 'meteor/meteor';
import {Groups} from './../api/groups.js';
import CommentSection from './CommentSection';
import MemeDescription from './MemeDescription';
import $ from 'jquery';
export default class Meme extends React.Component {

	constructor(props) {
	        super(props);

	        this.state = {
	            active: false,
	        };
					this.toggleClass.bind(this);
	    }

	toggleClass() {
    	const currentState = this.state.active;
	    this.setState({ active: !currentState });
	  };

	editDescription(event){
		 event.preventDefault();

		 var newDescription = event.target.descriptionEdit.value;
		 console.log(newDescription);
		if(newDescription){
			console.log(newDescription);
			Memes.update(this.props.meme._id, {
			$set: {
				description: newDescription
			}
			});
		}
	}
	deleteMeme(e){
		e.preventDefault();
		Memes.remove(this.props.meme._id);

	}
	upvote(e){
		e.preventDefault();
		var userId = Accounts.userId();
		if(this.props.meme.upvotes.indexOf(userId)<0){
			Memes.update(this.props.meme._id, {
							$inc: {
							  votes: 1
							}
						  });
			Memes.update(this.props.meme._id, {
							$push: {
							  upvotes: userId
							}
						});

		}
	}
	downvote(e){
		e.preventDefault();
		var userId = Accounts.userId();
		if(this.props.meme.upvotes.indexOf(userId)>=0){

		    Memes.update(this.props.meme._id, {
					$inc: {
					  votes: -1
					}
				 });
			Memes.update(this.props.meme._id, {
							$pull: {
							  upvotes: userId
							}
						  });

			}
	}
		createDropDownOptions(myGroups) {
     let items = [];
     for (let i = 0; i < myGroups.length; i++) {
          items.push(<MenuItem eventKey={i}>{myGroups[i].name}</MenuItem>);

     }
     return items;
 }
	renderMaskButton(myGroups){
		if(!window.location.pathname.endsWith("groupsPage")){
		return(	<DropdownButton title="Add to group" onSelect={(e)=>this.onDropdownSelected(e,myGroups)}id="bg-vertical-dropdown-1">
					{this.createDropDownOptions(myGroups)}
				</DropdownButton>);
		}else{
			console.log(this.props.group.name);
			return(
			<Button bsStyle="danger" onClick={(e)=>{this.removePost(e)}}>remove post</Button>
			);
		}
}
	removePost(e){
		Groups.update(this.props.group._id,{
					$pull: {
						memes: this.props.meme._id
					}
				});
	}
	onDropdownSelected(e,myGroups){

		console.log(e,myGroups);
		if(!myGroups[e].memes.includes(this.props.meme._id)){
				Groups.update(myGroups[e]._id,{
					$push: {
						memes: this.props.meme._id
					}
				});
		}
	}


  render() {
	var myGroups = Groups.find({ users: { $in: [Meteor.userId()] } }).fetch();

    return (
      <div>

        <div>
					<h3>{this.props.meme.description}</h3>


					<div className="show show-first">

						<Image className="image_size inside_image" src={this.props.meme.memeImage} responsive rounded/>

						<div className="mask">
							<MemeDescription meme={this.props.meme}/>
						</div>

					</div>




				</div>

				{this.renderMaskButton(myGroups)}
				<CommentSection currentMeme={this.props.meme}/>

				<br/><br/>
      </div>
    );
  }
}
