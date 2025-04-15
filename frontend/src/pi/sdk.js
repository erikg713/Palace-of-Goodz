export async function authenticateUser(onIncompletePaymentFound) {
  try {
    const scopes = ['username', 'payments'];
    const auth = await Pi.authenticate(scopes, onIncompletePaymentFound);
    return auth;
  } catch (error) {
    console.error('Pi Auth failed:', error);
    throw error;
  }
}
