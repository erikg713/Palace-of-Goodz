import express from 'express'
import { approvePayment, completePayment } from '../controllers/paymentController.js'

const router = express.Router()

router.post('/approve', approvePayment)
router.post('/complete', completePayment)

export default router
