import { createRequestTypes, action } from '../../helpers/action'

export const AUTH = createRequestTypes('AUTH')
export const SIGNIN_SUBMIT = 'SIGNIN_SUBMIT'

export const sagaActions = {
  auth: {
    request: (payload) => action(AUTH.REQUEST, { payload }),
    success: (payload) => action(AUTH.SUCCESS, { payload }),
    failure: (error) => action(AUTH.FAILURE, { error })
  }
}

export const viewActions = {
  signinSubmit: () => (
    action(SIGNIN_SUBMIT)
  )
}
