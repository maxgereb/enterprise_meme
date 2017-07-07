import React from 'react';
import PropTypes from 'prop-types';
import Navigationbar from './Navigationbar';
import {Groups} from './../api/groups.js';
import {Meteor} from 'meteor/meteor';
import Group from './Group';
import {Users} from './../api/users';
import {
  Button,
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  MenuItem,
  FormGroup,
  FormControl
} from 'react-bootstrap';
export default class GroupsPage extends React.Component{
    constructor(props){
      super(props);

      this.state={
        groups:[]
      };
    }




    componentDidMount(){

      this.groupTracker=Tracker.autorun(()=>{

        const groups = Groups.find().fetch();
        this.setState({groups});
      });
    }
    componentWillUnmount(){
      this.groupTracker.stop();

    }
  _createGroup(event){
	  event.preventDefault();
	  console.log("createGroup");
	  if(event.target.name.value){
		  var nameOfGroup = event.target.name.value;
		  var userId = Meteor.userId();
		  console.log(userId);
		  Groups.insert({
			name: nameOfGroup,
			users: [userId],
			memes: []
          });
	  }
  }
  _listGroups(){
	  console.log("grupite:",this.state.groups);
	  return this.state.groups.map((group)=>{
		  console.log("PUSKAM GRUPA",group.name);

		  return(
				<div>
				
					<Group group={group}/>
				</div>
		  );
		  
	  });
  }
  render(){

    return(
  
    <div>
	    <div><Navigationbar/></div>
		
		<br/><br/><br/><br/>
		<form onSubmit={(e) => this._createGroup(e)}>
			<center>

            <FormControl className="form_control" style={{
              width: 350
            }} type="text" id="name" placeholder="Name of group"/>
			<Button type="submit">Create Group</Button>
			</center>
		</form>
		<center>
			 <h1>Groups:</h1> 
			{this._listGroups()}
			
		</center>
    </div>

    );
  }
}
