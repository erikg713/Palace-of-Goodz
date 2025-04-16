export const savePayment = (data) => {
  const history = JSON.parse(localStorage.getItem('pi-payments') || '[]');
  history.unshift(data);
  localStorage.setItem('pi-payments', JSON.stringify(history));
};

export const getPayments = () => {
  return JSON.parse(localStorage.getItem('pi-payments') || '[]');
};
