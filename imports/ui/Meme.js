import React from 'react';
import PropTypes from 'prop-types';
import {Image, Button, FormControl, ButtonGroup} from 'react-bootstrap';
import {Memes} from './../api/memes.js';
import {Router} from 'react-router';
import {Meteor} from 'meteor/meteor';
import CommentSection from './CommentSection';
export default class Meme extends React.Component {
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
	
	isProfilePage(){
			if(window.location.pathname.endsWith("myMemes")){

			return(
				<div>

					<form onSubmit={this.editDescription.bind(this)}>
					<center>
					<FormControl className="form_control" style={{width: 400}} type="text" id="descriptionEdit" placeholder="Enter new description"/>
					</center>
					<button className="button_warning_sunflower" type="submit">
					  Save description
					</button>



					<button className="button_danger_red" onClick={(e)=> this.deleteMeme(e)} >
					  Delete meme!
					</button>
					</form>
				
				</div>

			);
			}else{
				return(
					<div>
					  <ButtonGroup >
	
						<button className="button_upvote" onClick={(e)=>this.upvote(e)} >+</button>


						<button className="button_downvote" onClick={(e)=>this.downvote(e)} >-</button>

					  </ButtonGroup>
					</div>



				);


			}


		}
  render() {


    return (
      <div>

        <div className="meme_container">
					<h3>{this.props.meme.description}</h3>
          <Image className="image_size" src={this.props.meme.memeImage} responsive rounded/>
            Hastags: {this.props.meme.hashtags}  ,  Votes: {this.props.meme.votes} , <div> Uploaded by {this.props.meme.uploaderName}</div>
			<div>
				
			</div>
       </div>
	   
		{ this.isProfilePage()}
		<CommentSection currentMeme={this.props.meme}/>
		<br/><br/>
      </div>
    );
  }
}
