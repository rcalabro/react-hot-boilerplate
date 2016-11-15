import forEach from 'lodash/forEach'
import * as ActionTypes from './actions'

const initialState = {
  ads: {}
}

export const checkout = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'LOAD_STORED_STATE':
      return {...action.storedState.checkout}
    case ActionTypes.ADD_AD:

      let newAds = { ...state.ads }
      forEach(action.ads, (val) => {
        newAds[val] = (newAds[val] || 0) + 1
      })

      return {
        ...state,
        ads: newAds
      }
    case ActionTypes.GET_TOTAL:
      console.log(action.payload)
      return {
        ...state,
        total: { ...action.payload }
      }
    case ActionTypes.CLEAR_ADS:
      return {
        ...state,
        ads: {},
        total: {}
      }
    default:
      return state
  }
}

export default {
  checkout
}
