import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import { auth } from './auth/reducer'
import { checkout } from './checkout/reducer'


const reducer = combineReducers({
  routing: routerReducer,
  form: formReducer,
  auth,
  checkout
})

export default reducer
