import { TableService } from '../Service/table.service.js'
import { validatePartialTable, validateTable } from '../utils/Validations/table.validator.js'

export class TableController {
  static async createTable(req, res) {
    const results = validateTable(req.body)
    if (!results.success) {
      return res.status(400).json({ message: JSON.parse(results.error.message) })
    }
    try {
      const table = await TableService.createTable(results.data)
      return res.status(201).json(table)
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
  }

  static async updateTableById(req, res) {
    const results = validatePartialTable(req.body)
    if (!results.success) {
      return res.status(400).json({ message: JSON.parse(results.error.message) })
    }

    const { id } = req.params
    try {
      const table = await TableService.updateTableById(id, results.data)
      return res.status(200).json(table)
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
  }

  static async getAllTables(req, res) {
    try {
      const tables = await TableService.getAllTables()
      return res.status(200).json(tables)
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
  }

  static async getAvailableTables(req, res) {
    try {
      const tables = await TableService.getAvailableTables()
      return res.status(200).json(tables)
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
  }

  static async changeStatusTable(req, res) {
    const results = validatePartialTable(req.body)
    if (!results.success) {
      return res.status(400).json({ message: JSON.parse(results.error.message) })
    }

    const { id } = req.params
    const { status } = results.data
    const { role } = req.user

    try {
      const newStatusTable = await TableService.changeStatusTable(id, status, role)
      return res.status(200).json(newStatusTable)
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
  }

  static async disabledTable(req, res) {
    const { id } = req.params
    try {
      const disabledTable = await TableService.disabledTable(id)
      return res.status(200).json(disabledTable)
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
  }
}
