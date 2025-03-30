import { useSession, signIn } from "next-auth/react";
import { useState } from "react";

// TypeScript types for session, products, and orders
type Session = {
  user: {
    role: string;
  };
};

type Product = {
  id: number;
  name: string;
  price: string;
};

type Order = {
  id: number;
  user: string;
  product: string;
  price: string;
  status: string;
};

const Admin = () => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);

  // Loading state
  if (status === "loading") {
    return <div className="loading">Loading...</div>;
  }

  // Error state for sign-in failure
  if (!session) {
    return (
      <div className="text-center text-white min-h-screen flex items-center justify-center">
        <h2>🔒 Please Log In as Admin</h2>
        <button onClick={() => signIn()} className="mt-4 px-6 py-2 bg-yellow-500 text-black rounded-lg">
          Sign in
        </button>
      </div>
    );
  }

  // Access denied for non-admin users
  if (session.user.role !== "admin") {
    return (
      <div className="text-center text-red-500 min-h-screen flex items-center justify-center">
        <h2>❌ Access Denied - Admins Only</h2>
      </div>
    );
  }

  // Admin dashboard
  return (
    <div className="container mx-auto p-8 text-white">
      <h1 className="text-3xl font-bold text-center">Admin Dashboard</h1>
      <p className="text-center mt-2">Manage products & view orders.</p>

      {/* Admin Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <AdminProducts />
        <AdminOrders />
      </div>
    </div>
  );
};

// Product Management Component
const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "Product A", price: "10 Pi" },
    { id: 2, name: "Product B", price: "15 Pi" },
  ]);

  return (
    <div className="bg-gray-800 p-5 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold">🛍️ Manage Products</h2>
      <ul className="mt-4">
        {products.map((product) => (
          <li key={product.id} className="flex justify-between p-2 border-b border-gray-700">
            {product.name} - {product.price}
            <button className="bg-red-500 px-3 py-1 rounded-lg text-white">Delete</button>
          </li>
        ))}
      </ul>
      <button className="mt-4 px-6 py-2 bg-green-500 text-black rounded-lg">➕ Add Product</button>
    </div>
  );
};

// Orders Management Component
const AdminOrders = () => {
  const orders: Order[] = [
    { id: 1, user: "John", product: "Product A", price: "10 Pi", status: "Pending" },
    { id: 2, user: "Alice", product: "Product B", price: "15 Pi", status: "Completed" },
  ];

  return (
    <div className="bg-gray-800 p-5 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold">📦 View Orders</h2>
      <ul className="mt-4">
        {orders.map((order) => (
          <li key={order.id} className="p-2 border-b border-gray-700">
            {order.user} bought {order.product} - <span className="text-yellow-400">{order.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;
