import React from 'react';
import renderer from 'react-test-renderer'
import Navbar from './Navbar';

jest.mock('react-dom')
const signout = () => null

test('Navbar renders correctly', () => {
  const tree = renderer.create(
    <Navbar signout={signout} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
})
