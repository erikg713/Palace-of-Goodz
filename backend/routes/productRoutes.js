import express from 'express'
import { getAllProducts, createProduct, deleteProduct } from '../controllers/productController.js'
import { authenticate } from '../middleware/auth.js'

const router = express.Router()

router.get('/', getAllProducts)
router.post('/', authenticate, createProduct)
router.delete('/:id', authenticate, deleteProduct)

export default router
