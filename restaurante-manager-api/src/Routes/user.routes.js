import { Router } from 'express'
import { UserController } from '../Controller/user.controller.js'
import { authMiddleware } from '../Middleware/auth.middleware.js'
import { roleMiddleware } from '../Middleware/role.middleware.js'

const router = Router()

router.get('/', authMiddleware, roleMiddleware(['admin']), UserController.getAllUsers)
router.patch('/:id', authMiddleware, roleMiddleware(['admin']), UserController.updateUser)
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), UserController.deleteUser)

export default router
