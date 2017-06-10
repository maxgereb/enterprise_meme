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
export default class Navigationbar extends React.Component {
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

              <Navbar.Collapse>
                <Navbar.Form pullLeft>
                  <FormGroup>
                    <FormControl type="text" placeholder="Search"/>
                  </FormGroup>
                  {' '}
                  <Button type="submit">Submit</Button>
                </Navbar.Form>
              </Navbar.Collapse>

            </Nav>
            <Nav pullRight>
              <NavItem eventKey={1} href="#">Profile</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}
