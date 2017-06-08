import React from 'react';
import PropTypes from 'prop-types';
import Meme from './Meme';
export default class MemeList extends React.Component {

  renderMemesInAList() {

    /* If there are no memes */
    if (this.props.memes.length == 0) {
      /* TODO: Appropriate message */
      return (
        <div>
          <h1>
            There are no Memes at the moment.
          </h1>
        </div>

      );

    } else {
      return this.props.memes.map((meme) => {
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
