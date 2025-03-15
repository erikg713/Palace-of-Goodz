import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../services/api';

const Marketplace: React.FC = () => {
    const [products, setProducts] = useState<Array<any>>([]);

    useEffect(() => {
        async function getProducts() {
            const data = await fetchProducts();
            setProducts(data);
        }

        getProducts();
    }, []);

    return (
        <div>
            <h1 style={{ textAlign: 'center', margin: '2rem 0' }}>Marketplace</h1>
            <div style={styles.container}>
                {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1rem',
        padding: '1rem',
    },
};

export default Marketplace;
