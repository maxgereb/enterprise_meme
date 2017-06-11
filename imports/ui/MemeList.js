import React from 'react';
import PropTypes from 'prop-types';
import Meme from './Meme';
import {Tracker} from 'meteor/tracker';
import {Memes} from './../api/memes';
export default class MemeList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      memes: []
    };
  }

  componentDidMount() {
    this.linksTracker = Tracker.autorun(() => {
      const memes = Memes.find().fetch();
      this.setState({memes});
    });
  }
  renderMemesInAList() {
    return this.state.memes.map((meme) => {
      return (
        <div>

          <center>
            <h1>MEME TITLE</h1>
            <img src={meme.memeImage}/>
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
