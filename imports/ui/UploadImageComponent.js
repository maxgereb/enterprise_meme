import React from 'react';
import Dropzone from 'react-dropzone'
import {Memes} from './../api/memes.js';
export default class UploadImageComponent extends React.Component {

  handleUpload(files) { //this function is called whenever a file was dropped in your dropzone
    if (files && files[0]) {
      let FR = new FileReader();
      FR.onload = (data) => {
        Memes.insert({memeImage: data.target.result});

      }
      FR.readAsDataURL(files[0]);
    }

  }

  render() {
    return (
      <div>
        <Dropzone onDrop={this.handleUpload.bind(this)}>
          <div>Try dropping some files here, or click to select files to upload.</div>
        </Dropzone>
      </div>
    )
  }
};
