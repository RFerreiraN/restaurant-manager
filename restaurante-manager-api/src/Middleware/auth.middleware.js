import jwt from 'jsonwebtoken'
import { AuthRepository } from '../Repository/auth.repository.js'

export async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access Denied' })
  }
  const token = authHeader.split(' ')[1]
  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
    const user = await AuthRepository.findById(decoded.id)
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' })
    }
    req.user = {
      id: user._id,
      role: user.role
    }
    return next()
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token' })
  }
}
