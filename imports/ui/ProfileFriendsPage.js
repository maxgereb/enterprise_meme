import React from 'react';
import FriendsList from './FriendsList';
import AllUsersList from './AllUsersList';
export default class ProfileFriendsPage extends React.Component{

  render(){
    return(
      <div>
        <div className="profilepage_meme_container">
        <center>

        <h1>KUDE SA MI AVERITE</h1>

          <AllUsersList/>
          <FriendsList/>

        </center>
      </div>
     </div>
    );
  }
}
