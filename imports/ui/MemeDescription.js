import React from 'react';
import PropTypes from 'prop-types';
import {Image, Button, FormControl, ButtonGroup} from 'react-bootstrap';
import {Memes} from './../api/memes.js';
import {Router} from 'react-router';
import {Meteor} from 'meteor/meteor';
import CommentSection from './CommentSection';
export default class MemeDescription extends React.Component {

  render(){
    return(
      <div className="meme_attributes_gravity_adjustments">


        <div><span className="meme_attribute_titles">  Hastags:</span> {this.props.meme.hashtags}</div>
        <div><span className="meme_attribute_titles"> Votes </span>: {this.props.meme.votes}</div>
        <div className="meme_attribute_content"> Uploaded by:  {this.props.meme.uploaderName}</div>

      </div>

        );
        }

        }
