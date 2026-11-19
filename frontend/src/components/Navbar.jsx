'use client';

import { useState } from 'react';
import './Navbar.css';
import Link from 'next/link';
import { GiYarn } from 'react-icons/gi';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <GiYarn className="navbar-icon" />
        Shizelle
      </div>

      <button
        className="navbar-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? '✕' : '☰'}
      </button>

      <ul className={`navbar-links ${isOpen ? 'open' : ''}`}>
        <li><Link href="/" onClick={closeMenu}>Home</Link></li>
        <li><Link href="/products" onClick={closeMenu}>Products</Link></li>
        <li><Link href="/about" onClick={closeMenu}>About</Link></li>
        <li><Link href="/contact" onClick={closeMenu}>Contact</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
