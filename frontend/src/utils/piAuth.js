export async function loginPi(scopes = ['payments']) {
  function onIncompletePaymentFound(payment) {
    // Handle any previous unfinished payments here
  }

  return Pi.authenticate(scopes, onIncompletePaymentFound)
    .then(auth => {
      // auth.user → { username, uid }
      // auth.accessToken → send to backend
      return auth;
    });
}
