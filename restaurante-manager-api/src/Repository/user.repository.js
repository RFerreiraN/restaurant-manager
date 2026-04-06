import { User } from '../Models/user.model.js'

export class UserRepository {
  static async getAllUsers() {
    return await User.find()
  }

  static async updateUser(id, data) {
    return await User.findByIdAndUpdate(id, data, { new: true })
  }

  static async deleteUser(id) {
    return await User.findByIdAndUpdate(id, { isActive: false }, { new: true })
  }

  static async getUserById(id) {
    return await User.findById(id)
  }
}
