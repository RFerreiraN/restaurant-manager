export const ORDER_EVENTS = {
  preparing: {
    event: 'order:status:changed',
    rooms: ['waiter', 'admin']
  },
  ready: {
    event: 'order:status:changed',
    rooms: ['waiter', 'admin']
  },
  delivered: {
    event: 'order:status:changed',
    rooms: ['admin']
  },
  paid: {
    event: 'order:status:changed',
    rooms: ['all']
  },
  cancelled: {
    event: 'order:status:changed',
    rooms: ['all']
  }
}
