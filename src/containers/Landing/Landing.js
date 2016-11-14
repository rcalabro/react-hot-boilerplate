import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Image from 'react-bootstrap/lib/Image'
import Navbar from '../../components/Navbar/Navbar'


import './Landing.scss'

class Landing extends Component {
  render() {
    const { user } = this.props;

    return (
      <div className='landing'>
        <div className='welcome'>
          <div className='container'>
            <div className='logo'>
                <Image src='/static/logo.svg'/>
                <h1>Ads Checkout</h1>
                {!user &&
                  <h2>Please <Link to={'/signin'}>sign in</Link> to access the Ads Checkout System</h2>
                }
                {user &&
                  <h2>Hi <strong>{user.name}</strong>, select your Ads on our <Link to={'/checkout'}>checkout page</Link>!</h2>
                }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Landing.propTypes = {
  user: PropTypes.object
}

Landing = connect(
  state => ({
    user: state.auth.user
  }), null
)(Landing)

export default Landing
