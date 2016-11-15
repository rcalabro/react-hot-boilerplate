import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux'
import createSagaMiddleware from 'redux-saga'
import { createSession } from 'redux-session'
import reducer from './modules/reducer'
import saga from './modules/saga'

import App from './containers/App/App'
import Landing from './containers/Landing/Landing'
import Signin from './containers/Signin/Signin'
import Checkout from './containers/Checkout/Checkout'


const sagaMiddleware = createSagaMiddleware()
const reduxRouterMiddleware = routerMiddleware(browserHistory)
const session = createSession({
  ns: 'seekcheckout'
})

const middleware = [reduxRouterMiddleware, sagaMiddleware, session]
const enhancer = compose(
  applyMiddleware(...middleware),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const store = createStore(reducer, enhancer)

sagaMiddleware.run(saga)
const history = syncHistoryWithStore(browserHistory, store)

const requireUser = (nextState, replace, cb) => {
  function checkAuth() {
    const { auth: { user }} = store.getState()
    if (!user) {
      replace('/signin')
    }
    cb()
  }
  checkAuth()
};

render(
  <Provider store={store}>
    <div>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Landing} />
          <Route path="signin" component={Signin} />
          <Route path="checkout" onEnter={requireUser} component={Checkout} />
        </Route>
      </Router>
    </div>
  </Provider>,
  document.getElementById('app')
)
