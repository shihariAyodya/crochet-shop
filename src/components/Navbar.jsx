import { useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { GiYarn } from 'react-icons/gi';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <GiYarn className="navbar-icon" />
        CrochetOn
      </div>

      <button
        className="navbar-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? '✕' : '☰'}
      </button>

      <ul className={`navbar-links ${isOpen ? 'open' : ''}`}>
        <li><Link to="/" onClick={closeMenu}>Home</Link></li>
        <li><Link to="/products" onClick={closeMenu}>Products</Link></li>
        <li><Link to="/about" onClick={closeMenu}>About</Link></li>
        <li><Link to="/#contact" onClick={closeMenu}>Contact</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;