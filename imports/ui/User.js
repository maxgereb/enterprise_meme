import React from 'react';
import PropTypes from 'prop-types';

import {Tracker} from 'meteor/tracker';

import {Image, Button, FormControl} from 'react-bootstrap';
export default class User extends React.Component {



  render() {
    return (
      <div>
        <h1>{this.props.currentUser.profile.givenName}</h1>

      </div>






    );
  }
}
