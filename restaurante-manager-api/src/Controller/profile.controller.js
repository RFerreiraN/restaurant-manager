import { ProfileService } from '../Service/profile.service.js'

export class ProfileController {
  static async getProfile(req, res) {
    try {
      const userId = req.user.id
      const user = await ProfileService.getProfile(userId)
      return res.status(200).json(user)
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
  }
}
