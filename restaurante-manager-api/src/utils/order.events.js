export const ORDER_EVENTS = {
  preparing: {
    event: 'order:preparing',
    rooms: ['waiter', 'admin']
  },
  ready: {
    event: 'order:ready',
    rooms: ['waiter', 'admin']
  },
  delivered: {
    event: 'order:delivered',
    rooms: ['admin']
  },
  paid: {
    event: 'table:update',
    rooms: ['all']
  },
  cancelled: {
    event: 'order:cancelled',
    rooms: ['all']
  }
}
