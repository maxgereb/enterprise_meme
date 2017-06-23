import React from 'react';
import PropTypes from 'prop-types';

import {Tracker} from 'meteor/tracker';

import {Image, Button, FormControl} from 'react-bootstrap';
export default class User extends React.Component {



  render() {
    return (
      <div>
          <img className="profile_picture_adjustments" src={this.props.currentUser.profile.profile_picture}/>
          <div> Name: {this.props.currentUser.profile.givenName} </div>
          <div> Surname: {this.props.currentUser.profile.surname} </div>

      </div>






    );
  }
}
