import { UserService } from '../Service/user.service.js'
import { validatePartialUser } from '../utils/Validations/auth.validator.js'

export class UserController {
  static async getAllUsers(req, res) {
    try {
      const users = await UserService.getAllUsers()
      return res.status(200).json(users)
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
  }

  static async updateUser(req, res) {
    const results = validatePartialUser(req.body)
    if (!results.success) {
      return res.status(400).json({ message: JSON.parse(results.error.message) })
    }

    const { id } = req.params

    try {
      const user = await UserService.updateUser(id, results.data)
      return res.status(200).json(user)
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
  }

  static async deleteUser(req, res) {
    const { id } = req.params
    try {
      const user = await UserService.deleteUser(id)
      return res.status(200).json(user)
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
  }
}
