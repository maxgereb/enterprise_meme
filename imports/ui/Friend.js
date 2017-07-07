import React from 'react';
import PropTypes from 'prop-types';
export default class Friend extends React.Component{

  render(){

    return(

    <div>


      <figure className="friend_box">
        <img src={this.props.friend.profile.profile_picture} alt="profile-sample1" className="background" />
        <img src={this.props.friend.profile.profile_picture} alt="profile-sample1" className="profile" />
        <figcaption>
          <h3>{this.props.friend.profile.givenName}<span>has {this.props.friend.profile.friendsList.length} followers.</span></h3>

        </figcaption>
      </figure>

      {/* <img className="profile_picture_adjustments" src={this.props.friend.profile.profile_picture}/>
        <div> Name: {this.props.friend.profile.givenName} </div>
      <div> Surname: {this.props.friend.profile.surname} </div> */}

    </div>

    );
  }
}
