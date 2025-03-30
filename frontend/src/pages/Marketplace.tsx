import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../services/api';
import styles from './Marketplace.module.css'; // Assuming you have a CSS module

// Define the type for a product
interface Product {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
}

const Marketplace: React.FC = () => {
  const [products, setProducts] = useState<Array<Product>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getProducts() {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError(`Failed to fetch products: ${err.message}`);
      } finally {
        setLoading(false);
      }
    }

    getProducts();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Marketplace</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : (
        <div className={styles.productGrid}>
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Marketplace;
