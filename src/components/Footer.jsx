import './Footer.css';
import Link from 'next/link';
import { FaWhatsapp, FaFacebookF, FaArrowRight } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const BRAND = 'Shizelle';
const WHATSAPP_LINK = 'https://wa.me/94705122847';
const WHATSAPP_DISPLAY = '+94 70 512 2847';
const FACEBOOK_LINK = 'https://www.facebook.com/profile.php?id=100094735062949';
const EMAIL = 'crocheton1@gmail.com';

function Footer() {
  return (
    <footer className="ft">
      {/* ── Call-to-action strip ── */}
      <div className="ft-cta">
        <div className="ft-cta-text">
          <h3>Have something special in mind?</h3>
          <p>Custom colours, sizes and designs — just send us a message.</p>
        </div>
        <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="ft-cta-btn">
          <FaWhatsapp /> Chat on WhatsApp
        </a>
      </div>

      {/* ── Main columns ── */}
      <div className="ft-main">
        <div className="ft-brand">
          <Link href="/" className="ft-logo">
            <span aria-hidden="true">🧶</span> {BRAND}
          </Link>
          <p>Handmade crochet pieces, made with love in Sri Lanka. Every item is made to order, just for you.</p>
          <div className="ft-social">
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <FaWhatsapp />
            </a>
            <a href={FACEBOOK_LINK} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href={`mailto:${EMAIL}`} aria-label="Email">
              <MdEmail />
            </a>
          </div>
        </div>

        <div className="ft-col">
          <h4>Explore</h4>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/products">Products</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/#contact">Contact</Link></li>
          </ul>
        </div>

        <div className="ft-col">
          <h4>Get in touch</h4>
          <ul className="ft-contact">
            <li>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                <FaWhatsapp /> {WHATSAPP_DISPLAY}
              </a>
            </li>
            <li>
              <a href={`mailto:${EMAIL}`}>
                <MdEmail /> {EMAIL}
              </a>
            </li>
            <li>
              <a href={FACEBOOK_LINK} target="_blank" rel="noopener noreferrer">
                <FaFacebookF /> Follow on Facebook
              </a>
            </li>
          </ul>
        </div>

        <div className="ft-col">
          <h4>How to order</h4>
          <ol className="ft-steps">
            <li>Pick your piece</li>
            <li>Choose size &amp; colour</li>
            <li>Order on WhatsApp</li>
          </ol>
          <Link href="/products" className="ft-shop-link">
            Shop now <FaArrowRight />
          </Link>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="ft-bottom">
        <p>&copy; {new Date().getFullYear()} {BRAND}. All rights reserved.</p>
        <p>Handmade with <span className="ft-heart">♥</span> in Sri Lanka</p>
      </div>
    </footer>
  );
}

export default Footer;
