import React from 'react';
import PropTypes from 'prop-types';
import {Image, Button, FormControl} from 'react-bootstrap';
export default class Meme extends React.Component {

  render() {
    console.log("shto");
    return (
      <div>

        <h1>{this.props.meme.description}</h1>
        <div className="parent_container">
          <Image className="image_size" src={this.props.meme.memeImage} responsive rounded/>
		  Hastags: {this.props.meme.hashtags},Votes: {this.props.meme.votes}, uploded by {this.props.meme.uploaderName} 
		  </div>
			
      </div>
    );
  }
}
