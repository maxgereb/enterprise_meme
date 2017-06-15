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

						<button className="button_upvote" onClick={() => {
						  Memes.update(this.props.meme._id, {
							$inc: {
							  votes: 1
							}
						  });
						}} >+</button>


						<button className="button_downvote" onClick={() => {if(this.props.meme.votes>0){
							  Memes.update(this.props.meme._id, {
								$inc: {
								  votes: -1
								}
							  });
							}
						}} >-</button>

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
       </div>
		{ this.isProfilePage()}

		<br/><br/>
      </div>
    );
  }
}
