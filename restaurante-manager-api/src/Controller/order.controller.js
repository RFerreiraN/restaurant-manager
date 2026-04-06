import { OrderService } from '../Service/order.service.js'
import { validateOrder, validateStatusSchema, validateWithOutStatus } from '../utils/Validations/order.validator.js'

export class OrderController {
  static async createOrder(req, res) {
    const results = validateOrder(req.body)
    if (!results.success) {
      return res.status(400).json({ message: JSON.parse(results.error.message) })
    }

    const validateData = {
      ...results.data,
      user: req.user.id
    }

    try {
      const order = await OrderService.createOrder(validateData)
      return res.status(201).json(order)
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
  }

  static async getAllOrders(req, res) {
    try {
      const orders = await OrderService.getAllOrders()
      return res.status(200).json(orders)
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
  }

  static async getOrderById(req, res) {
    const { id } = req.params
    try {
      const order = await OrderService.getOrderById(id)
      return res.status(200).json(order)
    } catch (error) {
      return res.status(404).json({ message: error.message })
    }
  }

  static async updateStatus(req, res) {
    const results = validateStatusSchema(req.body)
    if (!results.success) {
      return res.status(400).json({ message: JSON.parse(results.error.message) })
    }
    const { id } = req.params
    const { status } = results.data
    const { role } = req.user

    try {
      const orderStatus = await OrderService.updateStatus(id, status, role)
      return res.status(200).json(orderStatus)
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
  }

  static async getOrdersByTable(req, res) {
    const { tableId } = req.params
    try {
      const orders = await OrderService.getOrdersByTable(tableId)
      return res.status(200).json(orders)
    } catch (error) {
      return res.status(404).json({ message: error.message })
    }
  }

  static async getActiveOrdersByTable(req, res) {
    const { tableId } = req.params
    try {
      const orders = await OrderService.getActiveOrdersByTable(tableId)
      return res.status(200).json(orders)
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
  }

  static async getOrdersByUser(req, res) {
    const { id } = req.user
    try {
      const orderByUser = await OrderService.getOrdersByUser(id)
      return res.status(200).json(orderByUser)
    } catch (error) {
      return res.status(404).json({ message: error.message })
    }
  }

  static async updateOrder(req, res) {
    const results = validateWithOutStatus(req.body)
    if (!results.success) {
      return res.status(400).json({ message: JSON.parse(results.error.message) })
    }
    const { id } = req.params
    try {
      const modifyOrder = await OrderService.updateOrder(id, results.data)
      return res.status(200).json(modifyOrder)
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
  }
}
