import React from 'react';
import PropTypes from 'prop-types';
import Meme from './Meme';
import {all_memes} from './../../client/main';
export default class MemeList extends React.Component {

  renderMemesInAList() {
    console.log("shto");
    /* If there are no memes */
    if (this.props.all_memes.length == 0) {
      /* TODO: Appropriate message */
      return (
        <div>
          <h1>
            There are no Memes at the moment.
          </h1>
        </div>

      );

    } else {

      return this.props.all_memes.map((meme) => {

        return (<Meme/>);
      });
    }
  };
  render() {
    return (
      <div>{this.renderMemesInAList()}</div>
    );
  }
}
