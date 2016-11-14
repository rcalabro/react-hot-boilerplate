import * as ActionTypes from './actions'

const initialState = {
  ads: []
}

export const checkout = (state = initialState, action = {}) => {
  switch (action.type) {
    case ActionTypes.ADD.REQUEST:
      return {
        ...state,
        adding: true
      }
    case ActionTypes.ADD.SUCCESS:
      state.ads.push(action.payload)

      return {
        ...state,
        adding: false,
        error: null
      }
    case ActionTypes.ADD.FAILURE:
      return {
        ...state,
        adding: false,
        error: action.error
      }
      case ActionTypes.TOTAL.REQUEST:
        return {
          ...state,
          gettingTotal: true
        }
      case ActionTypes.TOTAL.SUCCESS:
        return {
          ...state,
          gettingTotal: false,
          total: action.payload
        }
    default:
      return state
  }
}

export default {
  checkout
}
