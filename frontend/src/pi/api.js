
const BASE_URL = 'http://localhost:5000'

export const approvePayment = async (paymentId, token) => {
  return fetch(`${BASE_URL}/payment/approve`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ paymentId })
  })
}

export const completePayment = async (paymentId, txid, token) => {
  return fetch(`${BASE_URL}/payment/complete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ paymentId, txid })
  })
}
