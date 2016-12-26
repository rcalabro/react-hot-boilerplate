import forEach from 'lodash/forEach'

function applyDiscount(total, discount) {
  const adl = total.ads[discount.adLevel]
  const disc = (adl.price * adl.quantity) - (discount.price * adl.quantity)

  total.ads[discount.adLevel]['discount'] = (total.ads[discount.adLevel]['discount'] || 0) - disc
  total['discount'] = (total['discount'] || 0) - disc
}

function applyBundle(total, bundle) {
  const adl = total.ads[bundle.adLevel]
  const bundles = Math.floor(adl.quantity / bundle.get)

  if(bundles > 0) {
    const disc = ((adl.price * bundle.get) - (adl.price * bundle.for)) * bundles
    total.ads[bundle.adLevel]['discount'] = (total.ads[bundle.adLevel]['discount'] || 0) - disc
    total['discount'] = (total['discount'] || 0) - disc
  }
}

function applyBundleDiscount(total, bundleDiscount) {
  const adl = total.ads[bundleDiscount.adLevel]

  if(adl.quantity >= bundleDiscount.over){
    const disc = (adl.price * adl.quantity) - (bundleDiscount.price * adl.quantity)
    total.ads[bundleDiscount.adLevel]['discount'] = (total.ads[bundleDiscount.adLevel]['discount'] || 0) - disc
    total['discount'] = (total['discount'] || 0) - disc
  }
}

function applyFreeForProducts(total, freeForProductsDiscount) {
  const membershipAdl = total.ads[freeForProductsDiscount.adLevel]
  let quantity = 0

  forEach(total.ads, (obj) => {
    quantity = quantity + obj.quantity
  })

  if(quantity >= freeForProductsDiscount.over) {
      const disc = (membershipAdl.price * membershipAdl.quantity)
      total.ads[freeForProductsDiscount.adLevel]['discount'] = (total.ads[freeForProductsDiscount.adLevel]['discount'] || 0) - disc
      total.ads[freeForProductsDiscount.adLevel]['total'] = total.ads[freeForProductsDiscount.adLevel]['total'] - disc

      total['discount'] = (total['discount'] || 0) - disc
  }
}

export const runTotal = (ads, deals, adLevels) => {
  let total = {
    ads: {}
  }

  forEach(ads, (qtd, ad) => {
    const adLevel = adLevels.filter((adl) => (adl.id === ad))[0]

    total.ads[ad] = {
      ...adLevel,
      quantity: qtd,
      total: adLevel.price * qtd
    }

    total['subtotal'] = (total['subtotal'] || 0) + adLevel.price * qtd

    const discount = deals.filter((deal) => (deal.type === 'discount' && deal.adLevel === ad))[0];
    if(discount) applyDiscount(total, discount)

    const bundle = deals.filter((deal) => (deal.type === 'bundle' && deal.adLevel === ad))[0];
    if(bundle) applyBundle(total, bundle)

    const bundleDiscount = deals.filter((deal) => (deal.type === 'bundle-discount' && deal.adLevel === ad))[0];
    if(bundleDiscount) applyBundleDiscount(total, bundleDiscount)

    const freeForProducts = deals.filter((deal) => (deal.type === 'free-for-products' && deal.adLevel === ad))[0];
    if(freeForProducts) applyFreeForProducts(total, freeForProducts)

    total['total'] = total['subtotal'] + (total['discount'] || 0)
  })

  return { data: total }
}
