import * as ActionTypes from './actions';

const initialState = {
  authenticated: false
};

export const auth = (state = initialState, action = {}) => {
  switch (action.type) {
    case ActionTypes.AUTH.REQUEST:
      return {
        ...state,
        authenticating: true
      };
    case ActionTypes.AUTH.SUCCESS:
      return {
        ...state,
        authenticating: false,
        authenticated: true,
        claims: action.payload,
        error: null
      };
    case ActionTypes.AUTH.FAILURE:
      return {
        ...state,
        authenticating: false,
        authenticated: false,
        claims: null,
        error: action.error
      };
    default:
      return state;
  }
};

export default {
  auth
};
