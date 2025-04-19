import express from 'express'
import { verifyPiUser } from '../controllers/piAuthController.js'

const router = express.Router()

router.post('/pi-login', verifyPiUser)

export default router
