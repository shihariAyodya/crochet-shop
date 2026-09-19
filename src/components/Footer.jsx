import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h3>CrochetOn</h3>
          <p>Handmade crochet pieces, made with love in Sri Lanka.</p>
        </div>

        <div className="footer-links">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/#contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-social">
          <div className="footer-social-icons">
            <a href="https://wa.me/+94705122847" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
              WhatsApp
            </a>
            <a href="https://facebook.com/yourpagename" target="_blank" rel="noopener noreferrer" aria-label="Visit our Facebook page">
              Facebook
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} CrochetOn. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;