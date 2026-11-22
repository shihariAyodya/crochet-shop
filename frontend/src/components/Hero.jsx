import './Hero.css';
import heroImage from '../assets/coverpage.png';
import { WHATSAPP_LINK } from '../lib/site';

function Hero() {
  const bgImg = heroImage?.src || heroImage;
  return (
    <section
      className="hero"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <span className="hero-badge">Handmade in Sri Lanka</span>
        <h1>Handmade Crochet, Handmade With Love</h1>
        <p className="hero-subtext">
          Cozy, one-of-a-kind pieces crafted just for you ,<br />browse the collection and order directly on WhatsApp.
        </p>
        
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="hero-button"
        >
          Order on WhatsApp
        </a>
      </div>
    </section>
  );
}

export default Hero;
