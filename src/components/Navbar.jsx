import './Navbar.css';
import { Link } from 'react-router-dom';
import { GiYarn } from 'react-icons/gi';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <GiYarn className="navbar-icon" />
        CrochetOn
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/#contact">Contact</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;