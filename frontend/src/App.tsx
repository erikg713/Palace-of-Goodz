import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './assets/styles/main.css'; // Importing the main CSS file for styling

// Lazy load the pages to improve performance by splitting the code into chunks
const Marketplace = lazy(() => import('./pages/Marketplace'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const UserDashboard = lazy(() => import('./pages/UserDashboard'));

const App: React.FC = () => {
  return (
    <Router>
      <Navbar /> {/* Including the Navbar component */}
      <Suspense fallback={<div>Loading...</div>}> {/* Adding a fallback UI while components are loading */}
        <Routes>
          <Route path="/" element={<Marketplace />} /> {/* Route for the marketplace page */}
          <Route path="/product/:id" element={<ProductDetail />} /> {/* Route for the product detail page */}
          <Route path="/dashboard" element={<UserDashboard />} /> {/* Route for the user dashboard */}
        </Routes>
      </Suspense>
      <Footer /> {/* Including the Footer component */}
    </Router>
  );
};

export default App;
