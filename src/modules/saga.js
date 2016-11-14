import { fork, join } from 'redux-saga/effects'
import { formSubmitSaga } from 'redux-form-submit-saga'

import {
  watcSignin,
  watchSignout
}from './auth/saga'

export default function* rootSaga() {
  yield [
    fork(formSubmitSaga),
    fork(watcSignin),
    fork(watchSignout)
  ]
}
