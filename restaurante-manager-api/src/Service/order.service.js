import { OrderRepository } from '../Repository/order.repository.js'
import { ProductRepository } from '../Repository/product.repository.js'

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

    const previousStatus = order.status

    this.validateStatusTransition(order.status, status, role)

    const orderStatus = await OrderRepository.updateStatus(id, status)

    return {
      order: orderStatus,
      previousStatus,
      newStatus: status
    }
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
