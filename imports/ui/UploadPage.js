import React from 'react';
import {Memes} from './../api/memes.js';
export default class UploadPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: '',
      imagePreviewUrl: ''
    };
  }

  _handleSubmit(event) { //this function is called whenever a file was dropped in your dropzone
    event.preventDefault();
    if (this.state.file) {
      let FR = new FileReader();
      FR.onload = (data) => {
        Memes.insert({memeImage: data.target.result});

      }
      FR.readAsDataURL(this.state.file);
    }

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
      $imagePreview = (<img src={imagePreviewUrl}/>);
    } else {
      $imagePreview = (
        <div className="previewText">Please select an Image for Preview</div>
      );
    }

    return (
      <div className="previewComponent">
        <form onSubmit={(e) => this._handleSubmit(e)}>
          <input className="fileInput" type="file" onChange={(e) => this._handleImageChange(e)}/>
          <button className="submitButton" type="submit" onClick={(e) => this._handleSubmit(e)}>Upload Image</button>
        </form>
        <div className="imgPreview">
          {$imagePreview}
        </div>
      </div>
    )
  }
}
