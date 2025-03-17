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
Python
header = {
    'Authorization': "Key YOUR-API-KEY"
}
export default App;
