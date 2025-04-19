export const piLogin = async () => {
  const scopes = ['username', 'payments'];
  try {
    const user = await window.Pi.authenticate(scopes, onIncompletePaymentFound);
    // Send user.uid and user.username to the backend
    return user;
  } catch (error) {
    console.error('Pi Login Error:', error);
    throw error;
  }
};

function onIncompletePaymentFound(payment) {
  console.log('Handle incomplete payment:', payment);
}
const auth = await Pi.authenticate(['payments'], onIncompletePaymentFound);
const token = auth.accessToken;

await fetch('/api/profile', {
  method: 'GET',
  headers: {
    Authorization: `Bearer ${token}`
  }
});
