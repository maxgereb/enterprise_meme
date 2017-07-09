import React from 'react';
import PropTypes from 'prop-types';
import {Image, Button, FormControl, ButtonGroup} from 'react-bootstrap';
import {Memes} from './../api/memes.js';
import {Router} from 'react-router';
import {Accounts} from 'meteor/accounts-base';
import {Meteor} from 'meteor/meteor';
import CommentSection from './CommentSection';
export default class MemeDescription extends React.Component {

  componentDidMount(){
    if(!window.location.pathname.endsWith("groupsPage")){
      if(Accounts.userId() && this.props.meme.upvotes.indexOf(Accounts.userId())<0){
        var btn = this.refs.up_down_vote_button;
        btn.style.background='#4CAF50';
      }else{
        var btn = this.refs.up_down_vote_button;
        btn.style.background='#E1332D';
      }
    }


  }
  isProfilePage(){
      if(!window.location.pathname.endsWith("myMemes") && !window.location.pathname.endsWith("groupsPage")){
        return(
          <div>
            <center>
              <div className="btn_like_hover_effect btn-5" onClick={(e)=>{
                console.log("hui");
                var userId = Accounts.userId();
                if(this.props.meme.upvotes.indexOf(userId)<0){
                  this.upvote(e);
                  var btn = this.refs.up_down_vote_button;
                  btn.style.background='#E1332D';
                }else{
                  this.downvote(e);
                  var btn = this.refs.up_down_vote_button;
                  btn.style.background='#4CAF50';
                }
                //this.upvote(e);
              }} ref="up_down_vote_button">{this.props.meme.upvotes.indexOf(Accounts.userId())<0? "Upvote" : "Downvote"}</div>
            </center>
          </div>
            );
            }
    }

    upvote(e){
  		e.preventDefault();
      console.log("vuv upvote");
      var userId = Accounts.userId();
  		// if(this.props.meme.upvotes.indexOf(userId)<0){
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

  		//}
  	}

    downvote(e){
  		e.preventDefault();
      console.log("vuv downvote");
  		var userId = Accounts.userId();
  		// if(this.props.meme.upvotes.indexOf(userId)>=0){

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

  			//}
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
