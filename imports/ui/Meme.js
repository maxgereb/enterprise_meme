import React from 'react';
import PropTypes from 'prop-types';
import {Image, Button, FormControl, ButtonGroup} from 'react-bootstrap';
import {Memes} from './../api/memes.js';
import {Router} from 'react-router';
import {Meteor} from 'meteor/meteor';
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
	isProfilePage(){
			if(window.location.pathname.endsWith("profile")){
			console.log("VPROFILA SUM")
			return(
				<div>
					<div>
					<form onSubmit={this.editDescription.bind(this)}>
					<center>
					<FormControl	style={{width: 400}} type="text" id="descriptionEdit" placeholder="Enter new description"/>
					</center>
					<Button type="submit" bsStyle="warning" bsSize="sm">
					  Save description
					</Button>
					</form>
					</div>
					<div>
					<Button onClick={(e)=> this.deleteMeme(e)} bsStyle="danger" bsSize="medium">
					  Delete meme!
					</Button>
					</div>
				</div>
			
			);
			}else{
				return(
					<div>
					  <ButtonGroup>
						<Button onClick={() => {
						  Memes.update(this.props.meme._id, {
							$inc: {
							  votes: 1
							}
						  });
						}} bsStyle="success">Upvote</Button>
						<Button onClick={() => {if(this.props.meme.votes>0){
							  Memes.update(this.props.meme._id, {
								$inc: {
								  votes: -1
								}
							  });
							}
						}} bsStyle="danger">Downvote</Button>

					  </ButtonGroup>
					</div>
				
				
				
				);
				
				
			}
			
			
		}
  render() {
			

    return (
      <div>
        <h1>{this.props.meme.description}</h1>
        <div className="meme_container">
          <Image className="image_size" src={this.props.meme.memeImage} responsive rounded/>
          Hastags: {this.props.meme.hashtags},Votes: {this.props.meme.votes}, uploded by {this.props.meme.uploaderName}
        </div>
		{ this.isProfilePage()}

		<br/><br/>
      </div>
    );
  }
}
