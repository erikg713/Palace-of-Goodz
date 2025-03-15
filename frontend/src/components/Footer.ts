import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer style={styles.footer}>
            <p>&copy; 2025 Palace-of-Goodz. All rights reserved.</p>
        </footer>
    );
};

const styles = {
    footer: {
        textAlign: 'center',
        padding: '1rem',
        backgroundColor: '#1a1a1a',
        color: '#fff',
        marginTop: '2rem',
    },
};

export default Footer;
