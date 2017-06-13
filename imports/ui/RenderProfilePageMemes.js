import React from 'react';
import {Tracker} from 'meteor/tracker';
import {Memes} from './../api/memes';
import {Meteor} from 'meteor/meteor';
import PropTypes from 'prop-types';
import Meme from './Meme';
export default class RenderProfilePageMemes extends React.Component{

  renderMemesInAList(){
    return this.props.currentProfileMemes.map((meme) => {
      return (
        <div>

          <center>
            <Meme meme={meme}/>

          </center>
        </div>
      );
    });


  };

  render(){
    console.log("pros ",this.props.currentProfileMemes);

        return(
          <div>{this.renderMemesInAList()}
          </div>
        );


    }


}
