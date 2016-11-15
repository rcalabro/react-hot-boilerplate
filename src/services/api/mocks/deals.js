export const deals = (client) => {
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
