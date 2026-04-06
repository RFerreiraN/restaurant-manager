import { AuthRepository } from '../Repository/auth.repository.js'
import jwt from 'jsonwebtoken'
import { comparePassword } from '../utils/hash.js'

export class AuthService {
  static async registerUser(data) {
    const existingUser = await AuthRepository.findByEmail(data.email)
    if (existingUser) {
      throw new Error('Email ready exists')
    }
    const user = await AuthRepository.register(data)

    return {
      user: {
        id: user._id,
        nombre: user.nombre,
        email: user.email,
        role: user.role
      }
    }
  }

  static async loginUser(email, password) {
    const user = await AuthRepository.findByEmail(email)
    if (!user) {
      throw new Error('Email or Password Invalid')
    }

    const isValid = await comparePassword(password, user.password)
    if (!isValid) {
      throw new Error('Email or Password Invalid')
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: '15m' }
    )

    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: '7d' }
    )

    await AuthRepository.findAndUpdateRefreshToken(user._id, refreshToken)
    return {
      user: {
        id: user._id,
        nombre: user.nombre,
        email: user.email,
        role: user.role
      },
      token,
      refreshToken
    }
  }

  static async refreshUserSession(refreshToken) {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)

    const user = await AuthRepository.findByToken(refreshToken)
    if (!user) {
      throw new Error('Token Invalid')
    }

    const newAccessToken = jwt.sign(
      { id: decoded.id },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: '15m' }
    )
    return { accessToken: newAccessToken }
  }

  static async logoutUser(id) {
    const user = await AuthRepository.findById(id)
    if (!user) {
      throw new Error('User not exists')
    }

    await AuthRepository.findAndUpdateRefreshToken(user._id, null)

    return {
      success: true,
      message: 'Session Closed successfully'
    }
  }
}
