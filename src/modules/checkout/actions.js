import { createRequestTypes, action } from '../../helpers/action'

export const ADD = createRequestTypes('ADD')
export const REMOVE = createRequestTypes('REMOVE')
export const TOTAL = createRequestTypes('TOTAL')

export const ADD_SUBMIT = 'ADD_SUBMIT'
export const REMOVE_SUBMIT = 'REMOVE_SUBMIT'
export const TOTAL_SUBMIT = 'TOTAL_SUBMIT'

export const sagaActions = {
  add: {
    request: (payload) => action(ADD.REQUEST, { payload }),
    success: (payload) => action(ADD.SUCCESS, { payload }),
    failure: (error) => action(ADD.FAILURE, { error })
  },
  remove: {
    request: (payload) => action(REMOVE.REQUEST, { payload }),
    success: (payload) => action(REMOVE.SUCCESS, { payload }),
    failure: (error) => action(REMOVE.FAILURE, { error })
  },
  total: {
    request: () => action(TOTAL.REQUEST),
    success: () => action(TOTAL.SUCCESS),
    failure: (error) => action(TOTAL.FAILURE, { error })
  }
}

export const viewActions = {
  add: (id) => (
    action(ADD_SUBMIT, { id })
  ),
  total: () => (
    action(TOTAL_SUBMIT)
  ),
  remove: (id) => (
    action(REMOVE_SUBMIT, { id })
  )
}
