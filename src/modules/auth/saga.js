import { put, call } from 'redux-saga/effects'
import { takeLatest } from 'redux-saga'
import { stopSubmit, setSubmitSucceeded, setSubmitFailed } from 'redux-form/lib/actions'
import { push } from 'react-router-redux'

import { signin, signout } from '../../services/api/auth'
import * as actions from './actions'

const auth = actions.sagaActions

function* signinSaga(action) {
  const { data, error} = yield call(signin, action.payload)

  if (data) {
    yield put(stopSubmit('signinForm'))
    yield put(auth.signin.success(data))
    yield put(setSubmitSucceeded('signinForm'))
    yield put(push('/'))
  } else {
    yield put(stopSubmit('signinForm', { _error: error.message }))
    yield put(auth.signin.failure(error))
    yield put(setSubmitFailed('signinForm'))
  }
}

function* signoutSaga() {
  yield call(signout)
  yield put(auth.signout.success())
  yield put(push('/'))
}

export function* watcSignin() {
  yield* takeLatest(actions.SIGNIN_SUBMIT, signinSaga)
}

export function* watchSignout() {
  yield* takeLatest(actions.SIGNOUT_SUBMIT, signoutSaga)
}

export default {
  watcSignin,
  watchSignout
}
