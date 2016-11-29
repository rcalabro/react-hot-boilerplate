import { viewActions, sagaActions } from './actions'


test('should create a SIGNIN_SUBMIT action', () => {
  const expectedAction = {
    type: 'SIGNIN_SUBMIT'
  }
  expect(viewActions.signinSubmit()).toEqual(expectedAction)
})

test('should create a SIGNOUT_SUBMIT action', () => {
  const expectedAction = {
    type: 'SIGNOUT_SUBMIT'
  }
  expect(viewActions.signoutSubmit()).toEqual(expectedAction)
})

test('should create a SIGNIN_REQUEST action', () => {
  const payload = {
    username: 'teste',
    password: 'teste123'
  }

  const expectedAction = {
    type: 'SIGNIN_REQUEST',
    payload
  }
  expect(sagaActions.signin.request(payload)).toEqual(expectedAction)
})

test('should create a SIGNIN_SUCCESS action', () => {
  const payload = {
    token: 'teste123123'
  }

  const expectedAction = {
    type: 'SIGNIN_SUCCESS',
    payload
  }
  expect(sagaActions.signin.success(payload)).toEqual(expectedAction)
})

test('should create a SIGNIN_FAILURE action', () => {
  const error = {
    error: 'invalid username'
  }

  const expectedAction = {
    type: 'SIGNIN_FAILURE',
    error
  }
  expect(sagaActions.signin.failure(error)).toEqual(expectedAction)
})
