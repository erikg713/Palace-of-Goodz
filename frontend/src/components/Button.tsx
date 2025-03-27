const handleBuy = async (product) => {
  const pi = window.Pi;
  const payment = await pi.createPayment({
    amount: parseFloat(product.price.split(" ")[0]),
    memo: `Purchase of ${product.name}`,
    metadata: { productId: product.id },
  });

  if (payment.completed) {
    alert("Payment Successful!");
  }
};
