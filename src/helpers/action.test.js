import { createRequestTypes, action } from './action'

test('createRequestTypes should generate TEST_REQUEST, TEST_SUCCESS and TEST_FAILURE actions given TEST as base', () =>{
  expect(createRequestTypes('TEST')).toEqual({
    REQUEST: 'TEST_REQUEST',
    SUCCESS: 'TEST_SUCCESS',
    FAILURE: 'TEST_FAILURE'
  })
})

test('action should generate a object with a type and no other property', () => {
  expect(action('TEST')).toEqual({
    type: 'TEST'
  })
})

test('action should generate a object merging type and payload properties', () => {
  expect(action('TEST', { test: 1 })).toEqual({
    type: 'TEST',
    test: 1
  })
})
