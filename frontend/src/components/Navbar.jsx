'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './Navbar.css';
import logo from '../assets/logoo.png';

const links = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);
  const [navHeight, setNavHeight] = useState(70);

  // The navbar is "fixed", so a spacer of the same height keeps the page from sliding under it
  useEffect(() => {
    const el = navRef.current;
    if (!el) return;
    const update = () => setNavHeight(el.offsetHeight);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Turn into a floating pill once the page is scrolled a little
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the phone menu when the page changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const isActive = (href) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <>
      <div className="nav-spacer" style={{ height: navHeight }} aria-hidden="true" />
      <div className={`nav-wrap ${scrolled ? 'is-scrolled' : ''}`}>
        <nav className="navbar" ref={navRef}>
          <Link href="/" className="navbar-logo" aria-label="Shizelle home">
            <img src={logo.src} alt="Shizelle" className="navbar-logo-img" />
          </Link>

          <button
            className="navbar-toggle"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? '✕' : '☰'}
          </button>

          <ul className={`navbar-links ${isOpen ? 'open' : ''}`}>
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={isActive(l.href) ? 'active' : ''}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Navbar;