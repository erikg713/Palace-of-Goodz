import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../services/api';

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
}

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function getProduct() {
            try {
                const data = await fetchProductById(id);
                setProduct(data);
            } catch (err) {
                setError('Failed to fetch product details');
            } finally {
                setLoading(false);
            }
        }

        getProduct();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div style={styles.container}>
            {product ? (
                <>
                    <img src={product.imageUrl} alt={product.name} style={styles.image} />
                    <h2 style={styles.title}>{product.name}</h2>
                    <p style={styles.description}>{product.description}</p>
                    <p style={styles.price}>{product.price} π</p>
                </>
            ) : (
                <div>Product not found</div>
            )}
        </div>
    );
};

const styles = {
    container: {
        textAlign: 'center',
        padding: '2rem',
    },
    image: {
        width: '100%',
        height: 'auto',
        borderRadius: '8px',
    },
    title: {
        fontSize: '2rem',
        margin: '0.5rem 0',
    },
    description: {
        fontSize: '1rem',
        color: '#666',
        margin: '1rem 0',
    },
    price: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        margin: '1rem 0',
    },
};

export default ProductDetail;
        margin: '1rem 0',
    },
};

export default ProductDetail;
