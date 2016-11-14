import React, { Component } from 'react'
import Col from 'react-bootstrap/lib/Col'

import SigninForm from './SigninForm'
import './Signin.scss'

class Signin extends Component {

  render() {
    return (
      <div className='signin'>
        <Col sm={8} smOffset={2}>
          <SigninForm />
        </Col>
      </div>
    )
  }
}


export default Signin
