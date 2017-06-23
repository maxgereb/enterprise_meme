import React from 'react';
import PropTypes from 'prop-types';
export default class Friend extends React.Component{

  render(){

    return(
  
    <div>
        <img className="profile_picture_adjustments" src={this.props.friend.profile.profile_picture}/>
        <div> Name: {this.props.friend.profile.givenName} </div>
        <div> Surname: {this.props.friend.profile.surname} </div>

    </div>

    );
  }
}
