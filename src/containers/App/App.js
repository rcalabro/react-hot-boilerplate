import React, { PropTypes, Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { viewActions as authViewActions } from '../../modules/auth/actions'
import Navbar from '../../components/Navbar/Navbar'

import './App.scss'

class App extends Component {

  render() {
    const { user, authActions: { signoutSubmit }} = this.props;

    return (
      <div>
        <Navbar user={user} signout={signoutSubmit} />
        <div className='container-fluid'>
          <div className='app'>
            { this.props.children }
          </div>
        </div>
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  user: PropTypes.object,
  authActions: PropTypes.shape({
    signinSubmit: PropTypes.func.isRequired,
    signoutSubmit: PropTypes.func.isRequired
  })
}

App = connect(
  state => ({
    user: state.auth.user
  }),
  dispatch => ({
    authActions: bindActionCreators(authViewActions, dispatch)
  })
)(App)

export default App
