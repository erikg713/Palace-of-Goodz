import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    return (
        <nav style={styles.nav}>
            <NavLink to="/" label="Home" />
            <NavLink to="/dashboard" label="Dashboard" />
        </nav>
    );
};

type Styles = {
    nav: React.CSSProperties;
    link: React.CSSProperties;
};

const styles: Styles = {
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

type NavLinkProps = {
    to: string;
    label: string;
};

const NavLink: React.FC<NavLinkProps> = ({ to, label }) => {
    return (
        <Link to={to} style={styles.link} aria-label={label}>
            {label}
        </Link>
    );
};

export default Navbar;
