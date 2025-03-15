import React, { useEffect, useState } from 'react';
import { fetchOrderHistory } from '../services/orderApi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const UserDashboard: React.FC = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function loadOrders() {
      const userOrders = await fetchOrderHistory();
      setOrders(userOrders);
    }
    loadOrders();
  }, []);

  return (
    <div>
      <Navbar />
      <h1>User Dashboard</h1>
      <div>
        <h2>Order History</h2>
        {orders.length ? (
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
