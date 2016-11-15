import { adLevels } from '../mocks/adLevels'
import { deals } from '../mocks/deals'

export const signin = (payload) => ({
  data: {
    name: payload.username,
    adLevels: adLevels(),
    deals: deals(payload.username)
  }
})
