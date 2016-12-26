import { runTotal } from './runTotal'
import { deals } from '../mocks/deals'

const availableAds = [
  { id: 'classic', name: 'Classic Ad', price: 269.99 },
  { id: 'standout', name: 'Standout Ad', price: 322.99 },
  { id: 'premium', name: 'Premium Ad', price: 394.99 },
  { id: 'membership', name: 'Membership', price: 99 }
]

describe('runTotal', () => {

  it('adding [classic, standout, premium] for default client should return total 987.97', ()=> {
    const clientDeals = deals('default')
    const selectedAds = {
      classic: 1,
      standout: 1,
      premium: 1
    }

    const data = runTotal(selectedAds, clientDeals, availableAds).data

    expect(data.total).toBe(987.97)
  })

  it('adding [classic, standout, premium] for default client should not return discount', ()=> {
    const clientDeals = deals('default')
    const selectedAds = {
      classic: 1,
      standout: 1,
      premium: 1
    }

    const data = runTotal(selectedAds, clientDeals, availableAds).data

    expect(data.discount).toBe(undefined)
  })

  it('adding [classic, classic, classic, premium] for Unilever should return total = 934.97', ()=> {
    const clientDeals = deals('Unilever')
    const selectedAds = {
      classic: 3,
      premium: 1
    }

    const data = runTotal(selectedAds, clientDeals, availableAds).data

    expect(data.total).toBe(934.97)
  })

  it('adding [classic, classic, classic, premium] for Unilever should return discount = -269.99', ()=> {
    const clientDeals = deals('Unilever')
    const selectedAds = {
      classic: 3,
      premium: 1
    }

    const data = runTotal(selectedAds, clientDeals, availableAds).data

    expect(data.discount).toBe(-269.99)
  })

  it('adding [standout, standout, standout, premium] for Apple should return total = 1294.96', ()=> {
    const clientDeals = deals('Apple')
    const selectedAds = {
      standout: 3,
      premium: 1
    }

    const data = runTotal(selectedAds, clientDeals, availableAds).data

    expect(data.total).toBe(1294.96)
  })

  it('adding [standout, standout, standout, premium] for Apple should return discount = -69', ()=> {
    const clientDeals = deals('Apple')
    const selectedAds = {
      standout: 3,
      premium: 1
    }

    const data = runTotal(selectedAds, clientDeals, availableAds).data

    expect(data.discount).toBe(-69)
  })

  it('adding [premium, premium, premium, premium] for Nike should return total = 1519.96', ()=> {
    const clientDeals = deals('Nike')
    const selectedAds = {
      premium: 4
    }

    const data = runTotal(selectedAds, clientDeals, availableAds).data

    expect(data.total).toBe(1519.96)
  })

  it('adding [premium, premium, premium, premium] for Nike should return discount = -60', ()=> {
    const clientDeals = deals('Nike')
    const selectedAds = {
      premium: 4
    }

    const data = runTotal(selectedAds, clientDeals, availableAds).data

    expect(data.discount).toBe(-60)
  })

  it('adding [premium, premium, premium, premium] for Ford should return total = 3729.89', ()=> {
    const clientDeals = deals('Ford')
    const selectedAds = {
      classic: 5,
      standout: 1,
      premium: 6
    }

    const data = runTotal(selectedAds, clientDeals, availableAds).data

    expect(data.total).toBeCloseTo(3729.89, 2)
  })

  it('adding [classic x 5, standout, premium x 6] for Ford should return discount = -312.99', ()=> {
    const clientDeals = deals('Ford')
    const selectedAds = {
      classic: 5,
      standout: 1,
      premium: 6
    }

    const data = runTotal(selectedAds, clientDeals, availableAds).data

    expect(data.discount).toBe(-312.99)
  })

  it('when adding ten products Membership should be free', () => {
      const clientDeals = deals('default')
      const selectedAds = {
        classic: 10,
        membership: 1
      }


      const data = runTotal(selectedAds, clientDeals, availableAds).data.ads

      expect(data.membership.total).toBe(0)
  })

  it('when adding less than ten products Membership should cost 99', () => {
      const clientDeals = deals('default')
      const selectedAds = {
        classic: 2,
        membership: 1
      }


      const data = runTotal(selectedAds, clientDeals, availableAds).data.ads

      expect(data.membership.total).toBe(99)
  })

  it('when adding 2 classics and 8 standouts Membership should be free', () => {
      const clientDeals = deals('default')
      const selectedAds = {
        classic: 2,
        standout: 8,
        membership: 1
      }


      const data = runTotal(selectedAds, clientDeals, availableAds).data.ads

      expect(data.membership.total).toBe(0)

  })
})
