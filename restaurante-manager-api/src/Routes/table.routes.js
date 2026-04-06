import { Router } from 'express'
import { TableController } from '../Controller/table.controller.js'
import { authMiddleware } from '../Middleware/auth.middleware.js'
import { roleMiddleware } from '../Middleware/role.middleware.js'

const router = Router()

router.get('/admin', authMiddleware, roleMiddleware(['admin']), TableController.getAllTables)
router.patch('/:id/status', authMiddleware, TableController.changeStatusTable)
router.patch('/:id', authMiddleware, roleMiddleware(['admin']), TableController.updateTableById)
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), TableController.disabledTable)
router.post('/', authMiddleware, roleMiddleware(['admin']), TableController.createTable)
router.get('/', authMiddleware, TableController.getAvailableTables)

export default router
