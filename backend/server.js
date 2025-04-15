import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import paymentRoutes from './routes/paymentRoutes.js'
import mongoose from 'mongoose'
import productRoutes from './routes/productRoutes.js'

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Mongo error', err))

app.use('/products', productRoutes)
dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())

app.use('/payment', paymentRoutes)

const PORT = 5000
app.listen(PORT, () => {
  console.log(`Backend server running at http://localhost:${PORT}`)
})
import express from 'express'
import cors from 'cors'
import paymentRoutes from './routes/paymentRoutes.js'

const app = express()
app.use(cors())
app.use(express.json())
app.use('/payment', paymentRoutes)

const PORT = 5000
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
