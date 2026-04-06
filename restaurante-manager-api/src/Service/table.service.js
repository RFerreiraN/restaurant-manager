import { TableRepository } from '../Repository/table.repository.js'

export class TableService {
  // Gestión Administrativa (Solo Admin)
  static async createTable(data) {
    const { number } = data
    const existingTable = await TableRepository.getTableByNumber(number)
    if (existingTable) {
      throw new Error('Table already exists')
    }

    const table = await TableRepository.createTable(data)
    return table
  }

  static async updateTableById(id, data) {
    const table = await TableRepository.updateTableById(id, data)
    if (!table) {
      throw new Error('Table not Exists')
    }
    return table
  }

  static async disabledTable(id) {
    const table = await TableRepository.disabledTable(id)
    if (!table) {
      throw new Error('Table Not Exists')
    }
    return table
  }

  // Gestión Operativa (Camareros y Admins)

  static async getAllTables() {
    const tables = await TableRepository.getAllTables()
    return tables
  }

  static async getAvailableTables() {
    const tables = await TableRepository.getAvailableTables()
    return tables
  }

  static async changeStatusTable(id, status, role) {
    const table = await TableRepository.getTableById(id)
    if (!table) {
      throw new Error('Table not Exists')
    }

    if (table.status === 'occupied' && status === 'occupied') {
      throw new Error('Table is already occupied')
    }

    if (status === 'disabled' && role !== 'admin') {
      throw new Error('Unauthorized Access')
    }
    const statusTable = await TableRepository.changeStatusTable(id, status)
    return statusTable
  }
}
