import { AuthService } from '../Service/auth.service.js'
import { hashPassword } from '../utils/hash.js'
import { validateAuthLogin, validateAuthRegister } from '../utils/Validations/auth.validator.js'

export class AuthController {
  static async register(req, res) {
    const results = validateAuthRegister(req.body)
    if (results.error) {
      return res.status(400).json({ message: JSON.parse(results.error.message) })
    }

    const user = results.data

    const hashedPassword = await hashPassword(user.password)
    user.password = hashedPassword

    await AuthService.registerUser(user)
    return res.json({
      user: {
        nombre: user.nombre,
        email: user.email,
        role: user.role,
        isActive: user.isActive
      }
    })
  }

  static async login(req, res) {
    try {
      const results = validateAuthLogin(req.body)
      if (results.error) {
        return res.status(400).json({ message: JSON.parse(results.error.message) })
      }
      const { email, password } = results.data
      const { user, token, refreshToken } = await AuthService.loginUser(email, password)
      res.cookie('refresh_token', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60 * 24 * 7
      })
      return res.status(200).json({ user, accessToken: token })
    } catch (error) {
      return res.status(401).json({ message: error.message })
    }
  }

  static async refresh(req, res) {
    try {
      const refreshToken = req.cookies.refresh_token
      if (!refreshToken) {
        return res.status(401).json({ message: 'Invalid Token' })
      }
      const { accessToken } = await AuthService.refreshUserSession(refreshToken)
      return res.status(200).json({ accessToken })
    } catch (error) {
      return res.status(401).json({ message: error.message })
    }
  }

  static async logout(req, res) {
    try {
      const { id } = req.user
      await AuthService.logoutUser(id)
      res.clearCookie('refresh_token',
        {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict'
        }
      )
      return res.status(200).json({ message: 'Session Closed' })
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
  }
}
