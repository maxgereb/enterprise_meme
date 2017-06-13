import React from 'react';
import {Memes} from './../api/memes.js';
import {Button, FormControl} from 'react-bootstrap';
import {browserHistory} from 'react-router';
export default class UploadPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: '',
      imagePreviewUrl: '',
      uploaderId: '',
      uploaderName: '',
      hashtags: [],
      votes: 0,
      description: ''

    };
  }

  _handleSubmit(event) { //this function is called whenever a file was dropped in your dropzone
    event.preventDefault();
    this.state.uploaderId = Meteor.userId();
    this.state.uploaderName = Meteor.user().emails[0].address;
    this.state.description = document.getElementById('descriptionInput').value;
    var all_tags = document.getElementById('hashtagInput').value.split(" ");
    for (var i = 0; i < all_tags.length; i++) {
      all_tags[i] = "#" + all_tags[i];
    }
    this.state.hashtags.push(all_tags);
    if (this.state.file) {
      let FR = new FileReader();
      FR.onload = (data) => {
        console.log(this.state.uploaderId);
        console.log(this.state.uploaderName);
        console.log(this.state.description);
        console.log(this.state.hashtags);
        console.log(this.state.votes);
        Memes.insert({
          memeImage: data.target.result,
          uploaderId: this.state.uploaderId,
          uploaderName: this.state.uploaderName,
          description: this.state.description,
          hashtags: this.state.hashtags,
          votes: this.state.votes
        });
        alert("Upload successful!");
        browserHistory.push('/startPage');
      }
      FR.readAsDataURL(this.state.file);
    }

  }
  goBack(e) {
    e.preventDefault();
    browserHistory.push('/startPage');
  }
  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({file: file, imagePreviewUrl: reader.result});
    }

    reader.readAsDataURL(file)
  }

  render() {
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img className="image_size" src={imagePreviewUrl}/>);
    } else {
      $imagePreview = (
        <div className="previewText">Please select an Image for Preview</div>
      );
    }

    return (
      <div className="previewComponent genericform">
      <header> <h1>Upload Memes</h1> </header>
        <form onSubmit={(e) => this._handleSubmit(e)}>
          <center>
            <input className="fileInput" type="file" onChange={(e) => this._handleImageChange(e)}/>
            <FormControl type="text" style={{
              width: 400
            }} id="descriptionInput" placeholder="Enter description"/>
            <FormControl type="text" style={{
              width: 400
            }} id="hashtagInput" placeholder="Enter Hashtag"/>
          </center>
          <div className="imgPreview">
            {$imagePreview}
          </div>
          <Button bsStyle="success" bsSize="large" className="submitButton" type="submit" onClick={(e) => this._handleSubmit(e)}>Upload Image</Button>
        </form>
        <center>
          <Button bsStyle="primary" bsSize="medium" className="goBack" onClick={(e) => this.goBack(e)}>Go Back</Button>
        </center>
      </div>
    )
  }
}
