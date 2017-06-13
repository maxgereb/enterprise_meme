import React from 'react';
import RenderProfilePageMemes from './RenderProfilePageMemes';
import {Memes} from './../api/memes';
export default class ProfilePage extends React.Component{

  constructor(props){
    super(props);
    this.state={
      currentProfileMemes:[]
    };
  }

  componentDidMount(){
    Tracker.autorun(()=>{
      const currentProfileMemes = Memes.find({uploaderId:Meteor.userId()}).fetch();
      this.setState({currentProfileMemes});
    });
  }

  render(){
    console.log("stava neshto toka");
    return(
      <div>
        <h1>Hello maina ! Here are your memes:</h1>
        <RenderProfilePageMemes currentProfileMemes={this.state.currentProfileMemes}/>
      </div>
    );
  }
}
