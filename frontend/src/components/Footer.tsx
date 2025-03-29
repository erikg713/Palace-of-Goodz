import React from 'react';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
    return (
        <footer className={styles.footer} aria-label="Footer">
            <p>&copy; 2025 Palace-of-Goodz. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
