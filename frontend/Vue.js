const payment = await window.Pi.createPayment({
  amount: '400',
  memo: 'Purchase: Item #123',
  metadata: { orderId: 'abc123' }
});
