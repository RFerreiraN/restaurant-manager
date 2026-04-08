import { OrderRepository } from '../Repository/order.repository.js'
import { ProductRepository } from '../Repository/product.repository.js'
import { getSocketInstance } from '../Sockets/socket.js'

export class OrderService {
  static async createOrder(data) {
    const { items } = data
    let totalCalculate = 0

    for (const item of items) {
      const product = await ProductRepository.getProductById(item.product)
      if (!product) {
        throw new Error('Product not found')
      }

      if (product.available === false) {
        throw new Error(`Product ${product.nombre} is currently not available`)
      }

      totalCalculate += product.price * item.quantity
    }
    data.total = totalCalculate
    const newOrder = await OrderRepository.createOrder(data)

    const io = getSocketInstance()

    console.log('Send to kitchen:', newOrder)
    io.to('kitchen').to('admin').emit('order:new', newOrder)

    return newOrder
  }

  static async getAllOrders() {
    const orders = await OrderRepository.getAllOrders()
    return orders
  }

  static async getOrderById(id) {
    const order = await OrderRepository.getOrderById(id)
    if (!order) {
      throw new Error('Order not found')
    }
    return order
  }

  static TRANSITIONS = {
    pending: {
      preparing: ['kitchen'],
      cancelled: ['admin']
    },
    preparing: {
      ready: ['kitchen'],
      cancelled: ['admin']
    },
    ready: {
      delivered: ['waiter']
    },
    delivered: {
      paid: ['waiter']
    }
  }

  static validateStatusTransition(currentStatus, nextStatus, role) {
    const allowedTransitions = this.TRANSITIONS[currentStatus]

    if (!allowedTransitions) {
      throw new Error('Unknown Status:', currentStatus)
    }

    const allowedRoles = allowedTransitions[nextStatus]

    if (!allowedRoles) {
      throw new Error('Allowed Transition')
    }

    if (!allowedRoles.includes(role)) {
      throw new Error('Unauthorized rol for transition')
    }
  }

  static async updateStatus(id, status, role) {
    const order = await OrderRepository.getOrderById(id)
    if (!order) {
      throw new Error('Order Not Found')
    }

    if (order.status === 'cancelled' || order.status === 'paid') {
      throw new Error('Cant modify Order')
    }

    this.validateStatusTransition(order.status, status, role)

    const orderStatus = await OrderRepository.updateStatus(id, status)

    if (status === 'preparing') {
      io.to('waiter').to('admin').emit('order:preparing', orderStatus)
    }

    if (status === 'ready') {
      io.to('waiter').to('admin').emit('order:ready', orderStatus)
    }

    if (status === 'delivered') {
      io.to('admin').emit('order:delivered', orderStatus)
    }

    if (status === 'paid') {
      io.emit('table:update', { tableId: orderStatus.table, status: 'free' })
    }

    if (status === 'cancelled') {
      io.emit('order:cancelled', orderStatus)
    }

    return orderStatus
  }

  static async getOrdersByTable(tableId) {
    const ordersByTable = await OrderRepository.getOrdersByTable(tableId)
    if (!ordersByTable) {
      throw new Error('Table empty')
    }
    return ordersByTable
  }

  static async getActiveOrdersByTable(tableId) {
    if (!tableId) {
      throw new Error('Invalid Id')
    }
    const orders = await OrderRepository.getActiveOrdersByTable(tableId)
    return orders
  }

  static async getOrdersByUser(userId) {
    const ordersByUser = await OrderRepository.getOrdersByUser(userId)
    return ordersByUser
  }

  // static async updateOrder(id, data) {
  //   const { items } = data
  //   let totalCalculate = 0
  //   for (const item of items) {
  //     const product = await ProductRepository.getProductById(item.product)
  //     if (!product) {
  //       throw new Error('Product not found')
  //     }

  //     if (product.available === false) {
  //       throw new Error(`Product ${product.nombre} is currently not available`)
  //     }

  //     totalCalculate += product.price * item.quantity
  //   }
  //   data.total = totalCalculate
  //   return await OrderRepository.updateOrder(id, data)
  // }

  static async updateOrder(id, data) {
    if (Array.isArray(data.items)) {
      let totalCalculate = 0

      for (const item of data.items) {
        const product = await ProductRepository.getProductById(item.product)

        if (!product) {
          throw new Error('Product not found')
        }

        if (!product.available) {
          throw new Error(`Product ${product.nombre} is currently not available`)
        }

        totalCalculate += product.price * item.quantity
      }

      data.total = totalCalculate
    }
    return await OrderRepository.updateOrder(id, data)
  }
}
