import React from 'react';
import PropTypes from 'prop-types';
import {browserHistory} from 'react-router';
import {Tracker} from 'meteor/tracker';
import $ from 'jquery';
import {Image, Button, FormControl} from 'react-bootstrap';


export default class User extends React.Component {

  constructor(props){
    super(props);

    this.state={
      currentProfileMemes:[],
      profile_picture: '',
      user_name:''
    };
  }

  componentDidMount(){

    /* JQUERY for the profile animation */
    var $Menu = $('.Img');
  	$('.Img').mouseenter(function() {
          $('.PopUp').css('opacity', '1');
  		$('.PopUp').css('margin-top', '20px');
      });
  		$('.Img').mouseleave(function() {
          $('.PopUp').css('opacity', '0');
  		$('.PopUp').css('margin-top', '0px');
      });
  	$('.Img').on('click', function() {
  		if($Menu.hasClass('Img')){
  				$('.Img').addClass('click');
  		$('.Img').removeClass('Img');
  			   $('.Profile').addClass('clickProfile');
  				 $('.Profile').removeClass('Profile');
  				 $('.clickPopUp').css('display', 'block');
  				 $('.PopUp').css('display', 'none');
  		}else{
  		$('.click').addClass('Img');
  		$('.click').removeClass('click');
  				$('.clickProfile').addClass('Profile');
  				$('.clickProfile').removeClass('clickProfile');
  								$('.clickPopUp').css('display', 'none');
  				$('.PopUp').css('display', 'block');
  			}
  		});
      /* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$*/

      this.profilePictureTracker = Tracker.autorun(()=>{

        const userIsActive = Meteor.user();
        if(Meteor.user()){
            console.log("KFO STAA");
            const profile_picture = Meteor.user().profile.profile_picture;
            const user_name = Meteor.user().profile.givenName + " " + Meteor.user().profile.surname;
            this.setState({profile_picture});
            this.setState({user_name});
        }

      });


  }



  render() {
    return (
      <div>

        <div className="ACon">
          <div className="Profile">
            <div>
              <img className="Img" src={this.state.profile_picture}/>
              <div className="overlay">
                <span><img/></span>
              </div>
            </div>
            <div className="PopUp">Open Profile</div>
            <div className="clickPopUp">
              <h4><a>{this.state.user_name}</a></h4>

              <h5 className="buttons" onClick={()=>{
                browserHistory.push("/profile");
              }}><a>Profile</a></h5>

              <h5 className="buttons" onClick={()=>{
                browserHistory.push("/myMemes");
              }}> <a >Uploaded Memes</a></h5>

              <h5 className="buttons" onClick={()=>{
                browserHistory.push("/manageFriends");
              }}><a  >Followed people</a></h5>


              <h5 className="buttons" onClick={()=>{
                browserHistory.push("/settings");
              }}><a>Settings</a></h5>

              <h5 className="buttons" onClick={()=>{

                Accounts.logout();
                browserHistory.replace('/');
              }}><a>Logout</a></h5>

              <div class="Social">
                <svg viewBox="0 0 512 512" id="logo" class="codepen"><path class="box" d="M427 201.9c-0.6-4.2-2.9-8-6.4-10.3L264.2 87.3c-4.9-3.3-11.4-3.3-16.3 0L91.4 191.6c-4 2.7-6.5 7.4-6.5 12.2v104.3c0 4.8 2.5 9.6 6.5 12.2l156.4 104.3c4.9 3.3 11.4 3.3 16.3 0L420.6 320.4c4-2.6 6.6-7.4 6.6-12.2V203.9C427.1 203.2 427.1 202.6 427 201.9 427 201.7 427.1 202.6 427 201.9zM270.7 127.1l115.2 76.8 -51.5 34.4 -63.8-42.7V127.1zM241.3 127.1v68.6l-63.8 42.7 -51.5-34.4L241.3 127.1zM114.3 231.4l36.8 24.6 -36.8 24.6V231.4zM241.3 384.9L126.1 308.1l51.5-34.4 63.8 42.6V384.9zM256 290.8l-52-34.8 52-34.8 52 34.8L256 290.8zM270.7 384.9V316.3l63.8-42.6 51.5 34.4L270.7 384.9zM397.7 280.6l-36.8-24.6 36.8-24.6V280.6z"/></svg>
                <svg viewBox="0 0 512 512" id="logo"><path class="box" d="M211.9 197.4h-36.7v59.9h36.7V433.1h70.5V256.5h49.2l5.2-59.1h-54.4c0 0 0-22.1 0-33.7 0-13.9 2.8-19.5 16.3-19.5 10.9 0 38.2 0 38.2 0V82.9c0 0-40.2 0-48.8 0 -52.5 0-76.1 23.1-76.1 67.3C211.9 188.8 211.9 197.4 211.9 197.4z"/></svg>
                <svg viewBox="0 0 512 512" id="logo"><path d="M422.6 193.6c-5.3-45.3-23.3-51.6-59-54 -50.8-3.5-164.3-3.5-215.1 0 -35.7 2.4-53.7 8.7-59 54 -4 33.6-4 91.1 0 124.8 5.3 45.3 23.3 51.6 59 54 50.9 3.5 164.3 3.5 215.1 0 35.7-2.4 53.7-8.7 59-54C426.6 284.8 426.6 227.3 422.6 193.6zM222.2 303.4v-94.6l90.7 47.3L222.2 303.4z"/></svg>
              </div>
            </div>
          </div>
        </div>
      </div>






    );
  }
}
