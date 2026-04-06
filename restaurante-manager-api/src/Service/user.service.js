import { User } from '../Models/user.model.js'
import { UserRepository } from '../Repository/user.repository.js'

export class UserService {
  static async getAllUsers() {
    const users = await UserRepository.getAllUsers()
    return users
  }

  static async updateUser(id, data) {
    const user = await UserRepository.updateUser(id, data)
    if (!user) {
      throw new Error('User Not Found')
    }
    return {
      nombre: user.nombre,
      email: user.email,
      role: user.role,
      isActive: user.isActive
    }
  }

  static async getUserById(id) {
    const user = await UserRepository.getUserById(id)
    if (!user) {
      throw new Error('User not found')
    }

    return {
      nombre: user.nombre,
      email: user.email,
      role: user.role,
      isActive: user.isActive
    }
  }

  static async deleteUser(id) {
    const user = await UserRepository.getUserById(id)
    if (!user) {
      throw new Error('User Not Found')
    }

    if (user.isActive === false) {
      throw new Error('User already deleted')
    }

    const deleteUser = await UserRepository.deleteUser(user.id)

    return {
      nombre: deleteUser.nombre,
      email: deleteUser.email,
      role: deleteUser.role,
      isActive: deleteUser.isActive
    }
  }
}
