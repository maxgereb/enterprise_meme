import React from 'react';
import PropTypes from 'prop-types';
import {Image, Button, FormControl, ButtonGroup} from 'react-bootstrap';
import {Memes} from './../api/memes.js';
import {Router} from 'react-router';
import {Meteor} from 'meteor/meteor';
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
						});{this.state.active ? 'your_className': null}

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


  render() {


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


				<CommentSection currentMeme={this.props.meme}/>
				<br/><br/>
      </div>
    );
  }
}
