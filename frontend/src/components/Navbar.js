import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cart } = useCart();
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-purple-600">
        🏰 Palace of Goods
      </Link>
      <div className="flex gap-4">
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart ({cartCount})</Link>
        <Link to="/profile">Profile</Link>
      </div>
    </nav>
  );
}
