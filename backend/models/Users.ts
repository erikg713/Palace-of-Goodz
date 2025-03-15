import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Marketplace from './pages/Marketplace';
import ProductDetail from './pages/ProductDetail';
import UserDashboard from './pages/UserDashboard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App: React.FC = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Marketplace />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/dashboard" element={<UserDashboard />} />
            </Routes>
            <Footer />
        </Router>
    );
};

export default App;
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    return (
        <nav style={styles.nav}>
            <Link to="/" style={styles.link}>Home</Link>
            <Link to="/dashboard" style={styles.link}>Dashboard</Link>
        </nav>
    );
};

const styles = {
    nav: {
        display: 'flex',
        gap: '1rem',
        padding: '1rem',
        backgroundColor: '#1a1a1a',
        color: '#fff',
    },
    link: {
        color: '#fff',
        textDecoration: 'none',
    },
};

export default Navbar;
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Marketplace from './pages/Marketplace';
import ProductDetail from './pages/ProductDetail';
import UserDashboard from './pages/UserDashboard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App: React.FC = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Marketplace />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/dashboard" element={<UserDashboard />} />
            </Routes>
            <Footer />
        </Router>
    );
};

export default App;
import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
    piUsername: string;
    walletAddress: string;
    password: string;
    role: 'admin' | 'user';
    createdAt: Date;
}

const UserSchema: Schema = new Schema<IUser>({
    piUsername: { type: String, required: true, unique: true },
    walletAddress: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IUser>('User', UserSchema);
import mongoose, { Schema, Document } from 'mongoose';

interface ICart extends Document {
    userId: mongoose.Schema.Types.ObjectId;
    products: Array<{ productId: mongoose.Schema.Types.ObjectId; quantity: number }>;
}

const CartSchema: Schema = new Schema<ICart>({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    products: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, default: 1 },
        },
    ],
});

export default mongoose.model<ICart>('Cart', CartSchema);
import mongoose, { Schema, Document } from 'mongoose';

interface IOrder extends Document {
    paymentId: string;
    productId: mongoose.Schema.Types.ObjectId;
    buyer: string;
    amount: number;
    status: 'pending' | 'completed' | 'failed';
    createdAt: Date;
}

const OrderSchema: Schema = new Schema<IOrder>({
    paymentId: { type: String, required: true, unique: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    buyer: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IOrder>('Order', OrderSchema);
import mongoose, { Schema, Document } from 'mongoose';

interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    seller: string;
    imageUrl: string;
    createdAt: Date;
}

const ProductSchema: Schema = new Schema<IProduct>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    seller: { type: String, required: true },
    imageUrl: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IProduct>('Product', ProductSchema);
