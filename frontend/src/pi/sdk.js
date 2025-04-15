export async function authenticateUser(onIncompletePaymentFound) {
  try {
    const scopes = ['username', 'payments']
    const auth = await Pi.authenticate(scopes, onIncompletePaymentFound)
    return auth
  } catch (error) {
    console.error('Auth error:', error)
    return null
  }
}
