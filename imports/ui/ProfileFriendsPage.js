import React from 'react';
import FriendsList from './FriendsList';
import AllUsersList from './AllUsersList';
import {browserHistory} from 'react-router';
export default class ProfileFriendsPage extends React.Component{

  render(){
    return(
      <div>
        <div className="profilepage_meme_container">
        <center>
          <AllUsersList/>

          <button className="button_danger_red" onClick={()=>{
            browserHistory.push("/myFriends");
          }}>Show me my friends</button>


        </center>
      </div>
     </div>
    );
  }
}
