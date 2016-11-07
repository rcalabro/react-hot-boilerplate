import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import reducer from './modules/reducer'

import App from './containers/App/App'

const store = createStore(reducer)
const history = syncHistoryWithStore(browserHistory, store)

render(
  <Provider store={store}>
    <div>
      <Router history={history}>
        <Route path="/" component={App}>
        </Route>
      </Router>
    </div>
  </Provider>,
  document.getElementById('app')
)
