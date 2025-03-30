import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import React from 'react';
import AppRoutes from './routes/AppRoutes';
import './assets/styles/main.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <AppRoutes />
    </div>
  );
};

export default App;
// Lazy load the pages
const Marketplace = lazy(() => import('./pages/Marketplace'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const UserDashboard = lazy(() => import('./pages/UserDashboard'));

const App: React.FC = () => {
    return (
        <Router>
            <Navbar />
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/" element={<Marketplace />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/dashboard" element={<UserDashboard />} />
                </Routes>
            </Suspense>
            <Footer />
        </Router>
    );
};

export default App;
