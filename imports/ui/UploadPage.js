import React from 'react';
import {Memes} from './../api/memes.js';
import {Button, FormControl} from 'react-bootstrap';
import {browserHistory} from 'react-router';
import Navigationbar from './Navigationbar';
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
      description: '',
	  comments: []
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
    this.state.hashtags=all_tags;
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
          votes: this.state.votes,
		  comments: this.state.comments
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
      <div><Navigationbar/></div>
      <header> <h1>Upload Memes</h1> </header>
        <br></br>
        <br></br>
        <br></br>
        <form onSubmit={(e) => this._handleSubmit(e)}>
          <center>
            <input className="fileInput form_control" type="file" onChange={(e) => this._handleImageChange(e)}/>
            <FormControl className="form_control" type="text" style={{
              width: 400
            }} id="descriptionInput" placeholder="Enter description"/>
            <FormControl className="form_control" type="text" style={{
              width: 400
            }} id="hashtagInput" placeholder="Enter Hashtag"/>
          </center>
          <div className="imgPreview">
            {$imagePreview}
          </div>
          <button className="button_success_cyan" type="submit" onClick={(e) => this._handleSubmit(e)}>Upload Image</button>
        </form>
        <center>
        <button className="button_primary_purple" onClick={(e) => this.goBack(e)}>Go Back</button>
        </center>
      </div>
    )
  }
}
