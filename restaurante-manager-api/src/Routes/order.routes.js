import { Router } from 'express'
import { OrderController } from '../Controller/order.controller.js'
import { authMiddleware } from '../Middleware/auth.middleware.js'
import { roleMiddleware } from '../Middleware/role.middleware.js'

const router = Router()

router.get('/admin', authMiddleware, roleMiddleware(['admin']), OrderController.getAllOrders)
router.get('/my-orders', authMiddleware, OrderController.getOrdersByUser)
router.post('/', authMiddleware, roleMiddleware(['waiter', 'admin']), OrderController.createOrder)
router.get('/table/:tableId', authMiddleware, OrderController.getOrdersByTable)
router.get('/table/:tableId/active', authMiddleware, roleMiddleware(['waiter', 'admin']), OrderController.getActiveOrdersByTable)
router.get('/:id', authMiddleware, OrderController.getOrderById)
router.patch('/:id/status', authMiddleware, OrderController.updateStatus)
router.patch('/:id', authMiddleware, OrderController.updateOrder)

export default router
