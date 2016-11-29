import { checkout } from './reducer'
import { viewActions } from './actions'

const initialState = {
  ads: {}
}

describe('checkout reducer', () => {
  it('should return initial state', () => {

    expect(checkout(undefined, {})).toEqual(initialState)
  })

  it('should add and AD', () => {
    const addAction = viewActions.addAd(['classic'])

    expect(checkout(initialState, addAction)).toEqual({
      ads: {
        classic: 1
      }
    })
  })

  it('should add two classics ADs one by one', () => {
    const addAction = viewActions.addAd(['classic'])

    const iteration1 = checkout(initialState, addAction)
    const iteration2 = checkout(iteration1, addAction)

    expect(iteration2).toEqual({
      ads: {
        classic: 2
      }
    })
  })

  it('should add two classics ADs at once', () => {
    const addAction = viewActions.addAd(['classic', 'classic'])

    expect(checkout(initialState, addAction)).toEqual({
      ads: {
        classic: 2
      }
    })
  })

  it('should add two classics and two premiums ADs one by one', () => {
    const addClassic = viewActions.addAd(['classic'])
    const addPremium = viewActions.addAd(['premium'])

    const iteration1 = checkout(initialState, addClassic)
    const iteration2 = checkout(iteration1, addPremium)
    const iteration3 = checkout(iteration2, addClassic)
    const iteration4 = checkout(iteration3, addPremium)

    expect(iteration4).toEqual({
      ads: {
        classic: 2,
        premium: 2
      }
    })
  })

  it('should add two classics and two premiums ADs at once', () => {
    const addAction = viewActions.addAd(['classic', 'premium', 'classic', 'premium'])

    expect(checkout(initialState, addAction)).toEqual({
      ads: {
        classic: 2,
        premium: 2
      }
    })
  })

  it('should get correct total', () => {
    const payload = {
      ads: {
        classic: {
          id:"classic",
          name:"Classic Ad",
          price:269.99,
          quantity:1,
          total:269.99,
        },
        standout: {
          id:"standout",
          name:"Standout Ad",
          price:322.99,
          quantity:1,
          total:322.99,
          discount:-13,
        },
        premium: {
          id:"premium",
          name:"Premium Ad",
          price:394.99,
          quantity:2,
          total:789.98,
        }
      },
      subtotal:1382.96,
      total:1369.96,
      discount:-13
    }

    const getTotal = viewActions.getTotal(payload)

    expect(checkout(initialState, getTotal)).toEqual({
      ads: {},
      total: {
        subtotal:1382.96,
        total:1369.96,
        discount:-13,
        ads: {
          classic: {
            id:"classic",
            name:"Classic Ad",
            price:269.99,
            quantity:1,
            total:269.99,
          },
          standout: {
            id:"standout",
            name:"Standout Ad",
            price:322.99,
            quantity:1,
            total:322.99,
            discount:-13,
          },
          premium: {
            id:"premium",
            name:"Premium Ad",
            price:394.99,
            quantity:2,
            total:789.98,
          }
        }
      }
    })
  })
})
