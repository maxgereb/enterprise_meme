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
import React from 'react';
import {browserHistory} from 'react-router';
import {Memes} from './../api/memes';
export default class Navigationbar extends React.Component {

  redirectToUploadPage() {
    browserHistory.push("/upload");
  }
  redirectToGroupsPage() {
    browserHistory.push("/groupsPage");
  }
  redirectToFresh() {

    browserHistory.push("/fresh");
  }
  redirectToHot() {

    browserHistory.push("/hot");
  }
  searchSubmit(){
	  var searchWord = document.getElementById('searchField').value;
	  if(document.getElementById('searchField').value){
			var filteredMemes =[];
			Memes.find().fetch().forEach(function(eachMeme){
				if(eachMeme.hashtags.includes(searchWord)){
					filteredMemes.push(eachMeme);
					console.log("namerih");
				}
			});
		this.props.changeStartpageState(filteredMemes);
	  }else{
		  this.props.changeStartpageState(Memes.find().fetch());
	  }
  }

  render() {
    return (
      <div>
        <Navbar className="navbar_properties" style={{
          height:55,
          position: 'absolute',
          top: 0,
          flex: 1,
          alignSelf: 'stretch',
          right: 0,
          left: 0,
          backgroundColor: '#010106'
        }} inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand className=" navbar-brand">
              <a href="/startpage"><img src="/images/memefiestlog.png"/></a>
            </Navbar.Brand>
            <Navbar.Toggle/>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem onClick={(e)=>this.redirectToHot()} eventKey={1} href="startPage">Hot</NavItem>
              <NavItem onClick={(e)=>this.redirectToFresh()} eventKey={2} href="startPage">Fresh</NavItem>

              <Navbar.Form pullLeft onSubmit={(e) => this.searchSubmit(e)}>
                <FormGroup>
                  <FormControl type="text" id="searchField" placeholder="Search"/>
                </FormGroup>
                {' '}

                <Button bsClass="btn" type="submit" onClick={(e) => this.searchSubmit(e) }>Submit</Button>
              </Navbar.Form>

            </Nav>


            <Navbar.Form pullRight>
              <button className="button_primary_navbar_purple"  onClick={this.redirectToGroupsPage.bind(this)} >Groups</button>
              <button className="button_primary_navbar_purple"  onClick={this.redirectToUploadPage.bind(this)} >Upload+</button>
              <button className="button_warning_navbar_sunflower" onClick={()=>{browserHistory.push("/profile");}} >Profile</button>
            </Navbar.Form>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}
