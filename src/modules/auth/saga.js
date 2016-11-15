import { put, call } from 'redux-saga/effects'
import { takeLatest } from 'redux-saga'
import { stopSubmit, setSubmitSucceeded, setSubmitFailed } from 'redux-form/lib/actions'
import { push } from 'react-router-redux'

import { signin, signout } from '../../services/api/auth'
import * as actions from './actions'
import * as checkoutActions from '../checkout/actions'

const auth = actions.sagaActions
const checkout = checkoutActions.viewActions

function* signinSaga(action) {
  const { data, error} = yield call(signin, action.payload)

  if (data) {
    yield put(stopSubmit('signinForm'))
    yield put(auth.signin.success(data))
    yield put(setSubmitSucceeded('signinForm'))
    yield put(push('/checkout'))
  } else {
    yield put(stopSubmit('signinForm', { _error: error.message }))
    yield put(auth.signin.failure(error))
    yield put(setSubmitFailed('signinForm'))
  }
}

function* signoutSaga() {
  yield put(auth.signout.success())
  yield put(checkout.clearAds())
  yield put({ type: 'CLEARED_STORED_STATE'})
  yield put(push('/'))
}

export function* watchSignin() {
  yield* takeLatest(actions.SIGNIN_SUBMIT, signinSaga)
}

export function* watchSignout() {
  yield* takeLatest(actions.SIGNOUT_SUBMIT, signoutSaga)
}

export default {
  watchSignin,
  watchSignout
}
