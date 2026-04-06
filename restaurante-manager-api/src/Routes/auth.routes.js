import { AuthController } from '../Controller/auth.controller.js'
import { Router } from 'express'
import { authMiddleware } from '../Middleware/auth.middleware.js'
import { roleMiddleware } from '../Middleware/role.middleware.js'

const router = Router()

router.post('/register', authMiddleware, roleMiddleware(['admin']), AuthController.register)
router.post('/login', AuthController.login)
router.post('/refresh', AuthController.refresh)
router.post('/logout', authMiddleware, AuthController.logout)

export default router
