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
          <h3>{this.props.friend.profile.givenName}<span>Followed</span></h3>
          <div className="icons"><a href="#"><i className="ion-social-reddit-outline"></i></a><a href="#"> <i className="ion-social-twitter-outline"></i></a><a href="#"> <i className="ion-social-vimeo-outline"></i></a></div>
        </figcaption>
      </figure>

      {/* <img className="profile_picture_adjustments" src={this.props.friend.profile.profile_picture}/>
        <div> Name: {this.props.friend.profile.givenName} </div>
      <div> Surname: {this.props.friend.profile.surname} </div> */}

    </div>

    );
  }
}
