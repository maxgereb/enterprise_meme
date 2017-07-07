import React from 'react';
import PropTypes from 'prop-types';
import {Image, Button, FormControl, ButtonGroup} from 'react-bootstrap';
import {Memes} from './../api/memes.js';
import {Router} from 'react-router';
import {Meteor} from 'meteor/meteor';
import CommentSection from './CommentSection';
export default class MemeDescription extends React.Component {

  isProfilePage(){
      if(!window.location.pathname.endsWith("myMemes")){
        return(
          <div>
            <center>
              <div className="btn_like_hover_effect btn-5" onClick={(e)=>this.upvote(e)} >Upvote</div>
            </center>
          </div>
            );
            }
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

  render(){
    return(
      <div className="meme_attributes_gravity_adjustments">


        <div><span className="meme_attribute_titles">  Hastags:</span> {this.props.meme.hashtags}</div>
        <div><span className="meme_attribute_titles"> Votes </span>: {this.props.meme.votes}</div>
        <div className="meme_attribute_content"> Uploaded by:  {this.props.meme.uploaderName}</div>
        {this.isProfilePage()}

      </div>

        );
        }

        }
