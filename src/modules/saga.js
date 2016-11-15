import { fork, join } from 'redux-saga/effects'
import { formSubmitSaga } from 'redux-form-submit-saga'

import {
  watchSignin,
  watchSignout
}from './auth/saga'
import {
  watchAddAd
}from './checkout/saga'

export default function* rootSaga() {
  yield [
    fork(formSubmitSaga),
    fork(watchSignin),
    fork(watchSignout),
    fork(watchAddAd)
  ]
}
