import { createRequestTypes, action } from '../../helpers/action'

export const SIGNIN = createRequestTypes('SIGNIN')
export const SIGNOUT = createRequestTypes('SIGNOUT')

export const SIGNIN_SUBMIT = 'SIGNIN_SUBMIT'
export const SIGNOUT_SUBMIT = 'SIGNOUT_SUBMIT'

export const sagaActions = {
  signin: {
    request: (payload) => action(SIGNIN.REQUEST, { payload }),
    success: (payload) => action(SIGNIN.SUCCESS, { payload }),
    failure: (error) => action(SIGNIN.FAILURE, { error })
  },
  signout: {
    request: () => action(SIGNOUT.REQUEST),
    success: () => action(SIGNOUT.SUCCESS),
    failure: (error) => action(SIGNOUT.FAILURE, { error })
  }
}

export const viewActions = {
  signinSubmit: () => (
    action(SIGNIN_SUBMIT)
  ),
  signoutSubmit: () => (
    action(SIGNOUT_SUBMIT)
  )
}
