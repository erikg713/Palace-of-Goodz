export async function startPayment({ amount, memo, metadata }, accessToken) {
  try {
    await Pi.createPayment(
      { amount, memo, metadata },
      {
        onReadyForServerApproval: async (paymentId) => {
          await fetch('http://localhost:5000/payment/approve', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({ paymentId })
          })
        },
        onReadyForServerCompletion: async (paymentId, txid) => {
          await fetch('http://localhost:5000/payment/complete', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({ paymentId, txid })
          })
        },
        onCancel: (paymentId) => console.log('Payment cancelled:', paymentId),
        onError: (error) => console.error('Payment error:', error)
      }
    )
  } catch (err) {
    console.error('Error initiating payment:', err)
  }
}
import { approvePayment, completePayment } from './api'

export async function startPayment({ amount, memo, metadata }, accessToken) {
  await Pi.createPayment(
    { amount, memo, metadata },
    {
      onReadyForServerApproval: async (paymentId) => {
        await approvePayment(paymentId, accessToken)
      },
      onReadyForServerCompletion: async (paymentId, txid) => {
        await completePayment(paymentId, txid, accessToken)
      },
      onCancel: (paymentId) => {
        console.log('Payment canceled:', paymentId)
      },
      onError: (err) => {
        console.error('Payment error:', err)
      }
    }
  )
}
