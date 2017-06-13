import React from 'react';
import PropTypes from 'prop-types';
import {Image, Button, FormControl, ButtonGroup} from 'react-bootstrap';
import {Memes} from './../api/memes.js';

export default class Meme extends React.Component {

  render() {

    return (
      <div>

        <h1>{this.props.meme.description}</h1>
        <div className="meme_container">
          <Image className="image_size" src={this.props.meme.memeImage} responsive rounded/>
          Hastags: {this.props.meme.hashtags},Votes: {this.props.meme.votes}, uploded by {this.props.meme.uploaderName}
        </div>
        <div>
          <ButtonGroup>
            <Button onClick={() => {
              Memes.update(this.props.meme._id, {
                $inc: {
                  votes: 1
                }
              });
            }} bsStyle="success">Upvote</Button>
            <Button onClick={() => {
              Memes.update(this.props.meme._id, {
                $inc: {
                  votes: -1
                }
              });
            }} bsStyle="danger">Downvote</Button>

          </ButtonGroup>
        </div>

      </div>
    );
  }
}
