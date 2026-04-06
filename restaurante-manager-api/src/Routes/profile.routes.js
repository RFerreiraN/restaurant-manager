import { Router } from 'express'
import { authMiddleware } from '../Middleware/auth.middleware.js'
import { ProfileController } from '../Controller/profile.controller.js'

const router = Router()

router.get('/', authMiddleware, ProfileController.getProfile)

export default router
