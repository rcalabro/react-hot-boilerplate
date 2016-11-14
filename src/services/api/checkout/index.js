import { post } from '../helper'

export const addAd = (payload) => post('/checkout/add', payload)
