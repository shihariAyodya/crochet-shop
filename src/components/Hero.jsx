import './Hero.css';
import heroImage from '../assets/coverpage.png';

function Hero() {
  return (
    <section
      className="hero"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <span className="hero-badge">Handmade in Sri Lanka</span>
        <h1>Handmade Crochet, Handmade With Love</h1>
        <p className="hero-subtext">
          Cozy, one-of-a-kind pieces crafted just for you ,<br />browse the collection and order directly on WhatsApp.
        </p>
        
          <a href="https://wa.me/94XXXXXXXXX"
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