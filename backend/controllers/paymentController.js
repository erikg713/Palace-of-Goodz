import axios from 'axios'
import { verifyUser } from '../utils/verifyUser.js'

const BASE_URL = 'https://api.minepi.com/sandbox'

export const approvePayment = async (req, res) => {
  const { paymentId } = req.body
  const token = req.headers.authorization?.split(' ')[1]

  const user = await verifyUser(token)
  if (!user) return res.status(401).json({ error: 'Unauthorized' })

  try {
    await axios.post(`${BASE_URL}/v2/payments/${paymentId}/approve`, {}, {
      headers: { Authorization: `Key ${process.env.PI_API_KEY}` }
    })
    res.json({ status: 'approved' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const completePayment = async (req, res) => {
  const { paymentId, txid } = req.body
  const token = req.headers.authorization?.split(' ')[1]

  const user = await verifyUser(token)
  if (!user) return res.status(401).json({ error: 'Unauthorized' })

  try {
    await axios.post(`${BASE_URL}/v2/payments/${paymentId}/complete`, {
      txid
    }, {
      headers: { Authorization: `Key ${process.env.PI_API_KEY}` }
    })
    res.json({ status: 'completed' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
