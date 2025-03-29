type Product = {
  id: string;
  name: string;
  price: string;
};

const handleBuy = async (product: Product): Promise<void> => {
  try {
    const pi = window.Pi;
    const payment = await pi.createPayment({
      amount: parseFloat(product.price.split(" ")[0]),
      memo: `Purchase of ${product.name}`,
      metadata: { productId: product.id },
    });

    if (payment.completed) {
      alert("Payment Successful!");
    }
  } catch (error) {
    console.error("Payment failed:", error);
    alert("Payment failed. Please try again.");
  }
};
