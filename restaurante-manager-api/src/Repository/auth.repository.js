import { User } from '../Models/user.model.js'

export class AuthRepository {
  static async register(data) {
    return await User.create(data)
  }

  static async findByEmail(email) {
    return await User.findOne({ email })
  }

  static async findByToken(refreshToken) {
    return await User.findOne({ refreshToken })
  }

  static async findAndUpdateRefreshToken(id, refreshToken) {
    return await User.findByIdAndUpdate(id, { refreshToken })
  }

  static async findById(id) {
    return await User.findById(id)
  }
}
