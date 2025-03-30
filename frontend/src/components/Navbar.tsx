import React from 'react';
import './Navbar.css';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <h1>Palace of Goodz</h1>
    </nav>
  );
};

export default Navbar;
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
