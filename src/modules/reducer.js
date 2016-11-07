import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { auth } from './auth/reducer';


const reducer = combineReducers({
  routing: routerReducer,
  auth
});

export default reducer;
