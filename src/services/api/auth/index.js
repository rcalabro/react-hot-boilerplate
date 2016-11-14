import { post } from '../helper'

export const signin = (payload) => post('/auth/signin', payload)
export const signout = () => post('/auth/signout')
