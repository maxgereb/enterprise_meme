import React from 'react';
import Dropzone from 'react-dropzone'

export default class Gallery extends React.Component {
  _handleUpload(files) { //this function is called whenever a file was dropped in your dropzone
    _.each(files, function(file) {
      file.owner = Meteor.userId(); //before upload also save the owner of that file
      Images.insert(file, function(err, fileObj) {
        if (err) {
          console.log(err); //in case there is an error, log it to the console
        } else {
          //the image upload is done successfully.
          //you can use this callback to add the id of your file into another collection
          //for this you can use fileObj._id to get the id of the file
        }
      });
    });
  }

  render() {
    return (
      <div>
        <Dropzone onDrop={this._handleUpload.bind(this)}>
          <div>Try dropping some files here, or click to select files to upload.</div>
        </Dropzone>
      </div>
    )
  }
};
