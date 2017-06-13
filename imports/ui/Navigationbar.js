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
          position: 'absolute',
          top: 0,
          flex: 1,
          alignSelf: 'stretch',
          right: 0,
          left: 0
        }} inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand className=" navbar-brand">
              <a href="#"><img src="/images/memefiestlog.png"/></a>
            </Navbar.Brand>
            <Navbar.Toggle/>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1} href="#">Hot</NavItem>
              <NavItem eventKey={2} href="#">Fresh</NavItem>

              <Navbar.Form pullLeft onSubmit={(e) => this.searchSubmit(e)}>
                <FormGroup>
                  <FormControl type="text" id="searchField" placeholder="Search"/>
                </FormGroup>
                {' '}
                <Button type="submit" onClick={(e) => this.searchSubmit(e)}>Submit</Button>
              </Navbar.Form>

            </Nav>
            <Nav pullRight>

              <NavItem eventKey={1} onClick={()=>{browserHistory.push("/profile");}}>Profile</NavItem>
              <NavItem href="#">
                <Button onClick={this.redirectToUploadPage.bind(this)} className="navbar-btn" bsStyle="primary">Upload+</Button>
              </NavItem>

            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}
