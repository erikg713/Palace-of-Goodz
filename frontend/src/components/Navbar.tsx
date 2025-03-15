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
