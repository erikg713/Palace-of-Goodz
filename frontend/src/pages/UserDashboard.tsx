import React, { useEffect, useState } from 'react';
import { fetchOrderHistory } from '../services/orderApi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

type Order = {
  _id: string;
  status: string;
  amount: number;
};

const UserDashboard: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadOrders() {
      try {
        const userOrders = await fetchOrderHistory();
        setOrders(userOrders);
      } catch (err) {
        setError('Failed to load order history.');
      } finally {
        setLoading(false);
      }
    }
    loadOrders();
  }, []);

  return (
    <div>
      <Navbar />
      <h1>User Dashboard</h1>
      <div>
        <h2>Order History</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : orders.length ? (
          orders.map(order => (
            <div key={order._id}>
              <p>Order ID: {order._id}</p>
              <p>Status: {order.status}</p>
              <p>Amount: {order.amount} π</p>
            </div>
          ))
        ) : (
          <p>No orders found.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default UserDashboard;
