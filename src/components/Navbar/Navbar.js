import React, { Component } from 'react';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import BSNavbar from 'react-bootstrap/lib/Navbar';
import Image from 'react-bootstrap/lib/Image';
import { IndexLinkContainer } from 'react-router-bootstrap';

class Navbar extends Component {

  render() {

    return (

      <BSNavbar fluid fixedTop>
        <BSNavbar.Header>
          <BSNavbar.Brand>
            <Image src='/static/logo.svg'/>
          </BSNavbar.Brand>
          <BSNavbar.Toggle />
        </BSNavbar.Header>
        <BSNavbar.Collapse>
          <Nav pullRight>
            <IndexLinkContainer to={'/'}>
              <NavItem eventKey={1}>Home</NavItem>
            </IndexLinkContainer>
            <IndexLinkContainer to={'/signin'}>
              <NavItem eventKey={99}>Sign In</NavItem>
            </IndexLinkContainer>
          </Nav>
        </BSNavbar.Collapse>
      </BSNavbar>
    );
  }
}

export default Navbar;
