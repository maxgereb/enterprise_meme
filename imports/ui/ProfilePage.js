import React from 'react';
import RenderProfilePageMemes from './RenderProfilePageMemes';
import {Memes} from './../api/memes';
import {Button} from 'react-bootstrap';
import {browserHistory} from 'react-router';

export default class ProfilePage extends React.Component{

  constructor(props){
    super(props);
    this.state={
      currentProfileMemes:[]
    };
  }

  componentDidMount(){
    this.memesTracker=Tracker.autorun(()=>{
      const currentProfileMemes = Memes.find({uploaderId:Meteor.userId()}).fetch();
      this.setState({currentProfileMemes});
    });
  }
  componentWillUnmount(){
    this.memesTracker.stop();
  }
  render(){
     
    return(
      <div className="genericform">
        <h1>Hello maina ! Here are your memes:</h1>
        <RenderProfilePageMemes currentProfileMemes={this.state.currentProfileMemes}/>
        <center><Button bsSize="large" bsStyle="primary" onClick={()=>{browserHistory.push("/startpage")}}>Go back to startpage!</Button></center>
      </div>
    );
  }
}
