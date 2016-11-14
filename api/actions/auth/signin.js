function getDeals(client) {
  switch (client) {
    case 'Unilever':
      return [
        {
          type: 'bundle',
          adLevel: 'classic',
          get: 3,
          for: 2
        }
      ]
    case 'Apple':
      return [
        {
          type: 'discount',
          adLevel: 'standout',
          price: 299.99
        }
      ]
    case 'Nike':
      return [
        {
          type: 'bundle-discount',
          adLevel: 'premium',
          over: 4,
          price: 379.99
        }
      ]
    case 'Ford':
      return [
        {
          type: 'discount',
          adLevel: 'standout',
          price: 309.99
        },
        {
          type: 'bundle',
          adLevel: 'classic',
          get: 5,
          for: 4
        },
        {
          type: 'bundle-discount',
          adLevel: 'premium',
          over: 3,
          price: 389.99
        }
      ]
    default:
      return [];
  }
}

function getAdLevels() {
  return [
    { id: 'classic', name: 'Classic Ad', price: 269.99
      , features: ['Basic Advertisement']},
    { id: 'standout', name: 'Standout Ad', price: 322.99
      , features: ['Basic Advertisement', 'Use your company logo', 'Longer presentation text']},
    { id: 'premium', name: 'Premium Ad', price: 394.99
      , features: ['Basic Advertisement', 'Use your company logo', 'Longer presentation text', 'Stay on top!']}
  ]
}

export default function signin(req) {
  const user = {
    name: req.body.username,
    deals: getDeals(req.body.username),
    adLevels: getAdLevels()
  };
  req.session.user = user
  return Promise.resolve(user)
}
