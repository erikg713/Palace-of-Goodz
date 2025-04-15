import axios from 'axios'
import { PI_API_KEY, PI_API_BASE } from '../config/env.js'

export const approvePayment = async (req, res) => {
  const { paymentId } = req.body
  try {
    await axios.post(`${PI_API_BASE}/v2/payments/${paymentId}/approve`, {}, {
      headers: { Authorization: `Key ${PI_API_KEY}` }
    })
    res.json({ status: 'approved' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const completePayment = async (req, res) => {
  const { paymentId, txid } = req.body
  try {
    await axios.post(`${PI_API_BASE}/v2/payments/${paymentId}/complete`, { txid }, {
      headers: { Authorization: `Key ${PI_API_KEY}` }
    })
    res.json({ status: 'completed' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
import axios from 'axios'
import { PI_API_KEY, PI_API_BASE } from '../config/env.js'

export const approvePayment = async (req, res) => {
  const { paymentId } = req.body
  try {
    await axios.post(`${PI_API_BASE}/v2/payments/${paymentId}/approve`, {}, {
      headers: { Authorization: `Key ${PI_API_KEY}` }
    })
    res.json({ status: 'approved' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const completePayment = async (req, res) => {
  const { paymentId, txid } = req.body
  try {
    await axios.post(`${PI_API_BASE}/v2/payments/${paymentId}/complete`, { txid }, {
      headers: { Authorization: `Key ${PI_API_KEY}` }
    })
    res.json({ status: 'completed' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
