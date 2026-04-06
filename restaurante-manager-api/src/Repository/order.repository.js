import { Order } from '../Models/order.model.js'

export class OrderRepository {
  // Creación y consultas Básicas

  static async createOrder(data) {
    return Order.create(data)
  }

  static async getAllOrders() {
    return Order.find()
      .populate('table', 'number')
      .populate('user', 'nombre')
  }

  static async getOrderById(id) {
    return Order.findById(id)
      .populate('table')
      .populate('user', 'nombre email')
      .populate({
        path: 'items.product',
        select: 'nombre price category'
      })
  }

  // Gestión de Estados
  static async updateStatus(id, status) {
    return Order.findByIdAndUpdate(id, { status }, { new: true })
      .populate('table', 'number')
      .populate('items.product', 'nombre')
  }

  static async getOrderByStatus(status) {
    return Order.find({ status })
  }

  // Filtros Operativos
  static async getOrdersByTable(tableId) {
    return Order.find({ table: tableId })
      .populate('items.product', 'nombre price')
  }

  static async getOrdersByUser(userId) {
    return Order.find({ user: userId })
  }

  // Actualizacion y persistencia
  static async updateOrder(id, data) {
    return Order.findByIdAndUpdate(id, data, { new: true })
      .populate('table', 'number')
      .populate('items.product', 'nombre')
  }

  static async getActiveOrdersByTable(tableId) {
    return Order.find({ table: tableId, status: { $nin: ['paid', 'cancelled'] } })
  }
}
