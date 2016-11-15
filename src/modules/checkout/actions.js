import { createRequestTypes, action } from '../../helpers/action'

export const ADD_AD = 'ADD_AD'
export const REMOVE_AD = 'REMOVE_AD'
export const CLEAR_ADS = 'CLEAR_ADS'
export const GET_TOTAL = 'GET_TOTAL'


export const viewActions = {
  addAd: (ads) => (
    action(ADD_AD, { ads })
  ),
  removeAd: (id) => (
    action(REMOVE_AD, { ads })
  ),
  clearAds: () => (
    action(CLEAR_ADS)
  ),
  getTotal: (payload) => (
    action(GET_TOTAL, { payload })
  )
}
