import { put, call, select } from 'redux-saga/effects'
import { takeLatest } from 'redux-saga'

import { runTotal } from '../../services/api/checkout/runTotal'
import * as actions from './actions'

const checkout = actions.viewActions

const getSelectedAds = (state) => (state.checkout.ads)
const getAdLevels = (state) => (state.auth.user.adLevels)
const getDeals = (state) => (state.auth.user.deals)

function* getTotalSaga(action) {
  const ads = yield select(getSelectedAds)
  const deals = yield select(getDeals)
  const adLevels = yield select(getAdLevels)

  const { data } = yield call(runTotal, ads, deals, adLevels)
  yield put(checkout.getTotal(data));
}

export function* watchAddAd() {
  yield* takeLatest(actions.ADD_AD, getTotalSaga)
}

export default {
  watchAddAd
}
