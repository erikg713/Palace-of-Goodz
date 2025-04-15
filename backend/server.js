import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import paymentRoutes from './routes/paymentRoutes.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/payment', paymentRoutes)

const PORT = 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
