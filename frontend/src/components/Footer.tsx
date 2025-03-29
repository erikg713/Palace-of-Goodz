import React from 'react';

const footerStyle = {
    textAlign: 'center' as 'center',
    padding: '1rem',
    backgroundColor: '#1a1a1a',
    color: '#fff',
    marginTop: '2rem'
};

const Footer: React.FC = () => {
    return (
        <footer style={footerStyle}>
            {/* Add your footer content here */}
            <p>© 2025 Palace of Goodz. All rights reserved.</p>
        </footer>
    );
}

export default Footer;
