import React, { PropTypes, Component } from 'react'
import { IndexLink } from 'react-router'
import Nav from 'react-bootstrap/lib/Nav'
import NavItem from 'react-bootstrap/lib/NavItem'
import BSNavbar from 'react-bootstrap/lib/Navbar'
import Image from 'react-bootstrap/lib/Image'
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap'

class Navbar extends Component {

  handleLogout = (event) => {
    event.preventDefault();
    this.props.signout();
  };

  render() {
    const { user } = this.props;

    return (

      <BSNavbar fluid fixedTop>
        <BSNavbar.Header>
          <IndexLink to={'/'}>
            <BSNavbar.Brand>
                <Image src='/static/logo.svg'/>
            </BSNavbar.Brand>
          </IndexLink>
          <BSNavbar.Toggle />
        </BSNavbar.Header>
        <BSNavbar.Collapse>
          {!user &&
            <Nav pullRight>
              <LinkContainer to={'/signin'}>
                <NavItem eventKey={99}>Sign In</NavItem>
              </LinkContainer>
            </Nav>
          }
          {user &&
            <Nav>
                <LinkContainer to={'/checkout'}>
                  <NavItem eventKey={1}>Ads Checkout</NavItem>
                </LinkContainer>
                <LinkContainer to="/logout">
                  <NavItem eventKey={2} onClick={this.handleLogout}>Logout</NavItem>
                </LinkContainer>
            </Nav>
          }
          {user &&
            <p className='navbar-text pull-right'>Welcome, <strong>{user.name}</strong>.</p>
          }
        </BSNavbar.Collapse>
      </BSNavbar>
    )
  }
}

Navbar.propTypes = {
  user: PropTypes.object,
  signout: PropTypes.func.isRequired
}

export default Navbar
