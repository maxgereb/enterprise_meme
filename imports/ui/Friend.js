import React from 'react';
import PropTypes from 'prop-types';
export default class Friend extends React.Component{

  render(){

    return(
      <div>
        <center>
        <div className="item">
          <h1>{this.props.friend.profile.givenName}</h1>
        </div>
        </center>
    </div>
    );
  }
}
