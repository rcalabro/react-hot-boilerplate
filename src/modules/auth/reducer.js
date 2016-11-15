import * as ActionTypes from './actions'

const initialState = {
  authenticated: false
}

export const auth = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'LOAD_STORED_STATE':
      return {...action.storedState.auth}
    case ActionTypes.SIGNIN.REQUEST:
      return {
        ...state,
        authenticating: true
      }
    case ActionTypes.SIGNIN.SUCCESS:
      return {
        ...state,
        authenticating: false,
        authenticated: true,
        user: action.payload,
        error: null
      }
    case ActionTypes.SIGNIN.FAILURE:
      return {
        ...state,
        authenticating: false,
        authenticated: false,
        user: null,
        error: action.error
      }
      case ActionTypes.SIGNOUT.REQUEST:
        return {
          ...state,
          signingout: true
        }
      case ActionTypes.SIGNOUT.SUCCESS:
        return {
          ...state,
          signingout: false,
          authenticated: false,
          user: null,
          error: null
        }
    default:
      return state
  }
}

export default {
  auth
}
