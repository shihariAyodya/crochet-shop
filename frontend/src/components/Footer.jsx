import './Footer.css';
import Link from 'next/link';
import { FaWhatsapp, FaFacebookF } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { WHATSAPP_LINK } from '../lib/site';
import logo from '../assets/logoo.png';

const BRAND = 'Shizelle';
const FACEBOOK_LINK = 'https://www.facebook.com/profile.php?id=100094735062949';
const EMAIL = 'crocheton1@gmail.com';

function Footer() {
  return (
    <footer className="ft">
      {/* ── One row: logo | description | social icons ── */}
      <div className="ft-main">
        <Link href="/" className="ft-logo" aria-label={`${BRAND} home`}>
          <img src={logo.src} alt={BRAND} className="ft-logo-img" />
        </Link>

        <p className="ft-desc">
          Handmade crochet pieces, made with love in Sri Lanka. Every item is made to order, just for you.
        </p>

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

      {/* ── Bottom bar ── */}
      <div className="ft-bottom">
        <p>&copy; {new Date().getFullYear()} {BRAND}. All rights reserved.</p>
        <p>Handmade with <span className="ft-heart">♥</span> in Sri Lanka</p>
      </div>
    </footer>
  );
}

export default Footer;