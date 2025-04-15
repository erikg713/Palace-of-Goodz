import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import paymentRoutes from './routes/paymentRoutes.js'

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())

app.use('/payment', paymentRoutes)

const PORT = 5000
app.listen(PORT, () => {
  console.log(`Backend server running at http://localhost:${PORT}`)
})
