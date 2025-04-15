import express from 'express'
import { approvePayment, completePayment } from '../controllers/paymentController.js'
import { authenticate } from '../middleware/auth.js'

const router = express.Router()
router.post('/approve', authenticate, approvePayment)
router.post('/complete', authenticate, completePayment)

export default router
