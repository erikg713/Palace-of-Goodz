import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../services/api';

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<any>(null);

    useEffect(() => {
        async function getProduct() {
            const data = await fetchProductById(id);
            setProduct(data);
        }

        getProduct();
    }, [id]);

    if (!product) return <div>Loading...</div>;

    return (
        <div style={styles.container}>
            <img src={product.imageUrl} alt={product.name} style={styles.image} />
            <h2 style={styles.title}>{product.name}</h2>
            <p style={styles.description}>{product.description}</p>
            <p style={styles.price}>{product.price} π</p>
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
