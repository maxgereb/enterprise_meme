import React from 'react';
import PropTypes from 'prop-types';
import Meme from './Meme';
import {Tracker} from 'meteor/tracker';
import {Memes} from './../api/memes';
import {Image, Button, FormControl} from 'react-bootstrap';
export default class MemeList extends React.Component {


  renderMemesInAList() {
    console.log("hui");

    return this.props.currentMemeList.map((meme) => {
      return (
        <div>

          <center>
            <Meme meme={meme}/>

          </center>
        </div>
      );
    });

  };
  render() {
    return (
      <div>{this.renderMemesInAList()}</div>






    );
  }
}
