import { Router } from 'express'
import { ProductController } from '../Controller/product.controller.js'
import { authMiddleware } from '../Middleware/auth.middleware.js'
import { roleMiddleware } from '../Middleware/role.middleware.js'

const router = Router()

router.get('/admin', authMiddleware, roleMiddleware(['admin']), ProductController.getAllProducts)
router.get('/', authMiddleware, ProductController.getAvailableProducts)
router.get('/:id', authMiddleware, ProductController.getProductById)
router.post('/', authMiddleware, roleMiddleware(['admin']), ProductController.createProduct)
router.patch('/:id', authMiddleware, roleMiddleware(['admin']), ProductController.updateProduct)
router.patch('/:id/availability', authMiddleware, roleMiddleware(['admin', 'kitchen']), ProductController.updateAvailability)
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), ProductController.disableProduct)

export default router
