import { Table } from '../Models/table.model.js'

export class TableRepository {
  static createTable(data) {
    return Table.create(data)
  }

  static updateTableById(id, data) {
    return Table.findByIdAndUpdate(id, data, { new: true })
  }

  static disabledTable(id) {
    return Table.findByIdAndUpdate(id, { status: 'disabled' }, { new: true })
  }

  static getAllTables() {
    return Table.find()
  }

  static getTableById(id) {
    return Table.findById(id)
  }

  static getTableByNumber(number) {
    return Table.findOne({ number })
  }

  static getAvailableTables() {
    return Table.find({ status: 'free' })
  }

  static changeStatusTable(id, status) {
    return Table.findByIdAndUpdate(id, { status }, { new: true })
  }
}
