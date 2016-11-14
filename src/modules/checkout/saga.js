import { put, call } from 'redux-saga/effects'
import { takeLatest } from 'redux-saga'

import * as actions from './actions'

const checkout = actions.sagaActions

function* addSaga(action) {
  yield put(checkout.add.success(action.id))
}

export function* watchAdd() {
  yield* takeLatest(actions.ADD_SUBMIT, addSaga)
}

export default {
  watchAdd
}
