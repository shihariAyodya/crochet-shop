import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h3>CrochetOn</h3>
          <p>Handmade crochet pieces, made with love in Sri Lanka.</p>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#products">Products</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-social">
          <h4>Get In Touch</h4>
          <div className="footer-social-icons">
            
              <a href="https://wa.me/94XXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
            >
              WhatsApp
            </a>
            
              <a href="https://facebook.com/yourpagename"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our Facebook page"
            >
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