export async function startPayment({ amount, memo, metadata }, {
  onApproval,
  onComplete,
  onCancel,
  onError
}) {
  try {
    const payment = await Pi.createPayment({
      amount,
      memo,
      metadata,
    }, {
      onReadyForServerApproval: onApproval,
      onReadyForServerCompletion: onComplete,
      onCancel,
      onError
    });

    console.log('Sandbox payment started:', payment);
    return payment;
  } catch (err) {
    console.error('Payment failed to start:', err);
  }
}
