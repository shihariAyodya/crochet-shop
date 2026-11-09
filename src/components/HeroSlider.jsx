import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './HeroSlider.css';
import heroImage from '../assets/coverpage.png';
import topPink1 from '../assets/products/top-pink-white-1.png.png';
import halterPink from '../assets/products/halter-pink.jpg';
import babyDressPink from '../assets/products/babydress-pink.jpeg';
import meshtopGreen from '../assets/products/meshtop-green.jpg';

const slides = [
  {
    id: 1,
    image: heroImage,
    badge: '✨ Handmade in Sri Lanka',
    title: 'Handmade Crochet,\nHandmade With Love',
    subtitle: 'Cozy, one-of-a-kind pieces crafted just for you.',
    cta: 'Order on WhatsApp',
    ctaLink: 'https://wa.me/+94705122847',
    ctaExternal: true,
    accent: 'var(--color-rose)',
  },
  {
    id: 2,
    image: halterPink,
    badge: '🌸 New Arrivals',
    title: 'Halter Crop Tops',
    subtitle: 'Lightweight, stylish crochet tops perfect for sunny days — available in 6 beautiful colors.',
    cta: 'Shop Crop Tops',
    ctaLink: '/products',
    ctaExternal: false,
    accent: '#C67683',
  },
  {
    id: 3,
    image: topPink1,
    badge: '🌿 Fan Favorite',
    title: 'Striped Crochet\nMesh Tops',
    subtitle: 'Relaxed open-weave designs with bold horizontal stripes — made with soft cotton yarn.',
    cta: 'Explore Collection',
    ctaLink: '/products',
    ctaExternal: false,
    accent: 'var(--color-sage-dark)',
  },
  {
    id: 4,
    image: babyDressPink,
    badge: '👶 For Little Ones',
    title: 'Adorable\nBaby Dresses',
    subtitle: 'Charming handcrafted baby dresses in soft breathable cotton, available in 5 pastel colors.',
    cta: 'Shop Baby',
    ctaLink: '/products',
    ctaExternal: false,
    accent: '#a893c9',
  },
  {
    id: 5,
    image: meshtopGreen,
    badge: '🏖️ Beach Ready',
    title: 'Ocean Mesh Tops',
    subtitle: 'Breezy open-weave crochet mesh tops — perfect layered over a bralette or swimsuit.',
    cta: 'Shop Now',
    ctaLink: '/products',
    ctaExternal: false,
    accent: 'var(--color-sage)',
  },
];

const AUTO_INTERVAL = 5000;

function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState('next');
  const timerRef = useRef(null);

  const goTo = (index, dir = 'next') => {
    if (animating || index === current) return;
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setAnimating(false);
    }, 500);
  };

  const goNext = () => {
    const next = (current + 1) % slides.length;
    goTo(next, 'next');
  };

  const goPrev = () => {
    const prev = (current - 1 + slides.length) % slides.length;
    goTo(prev, 'prev');
  };

  const resetTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(goNext, AUTO_INTERVAL);
  };

  useEffect(() => {
    timerRef.current = setInterval(goNext, AUTO_INTERVAL);
    return () => clearInterval(timerRef.current);
  }, [current]);

  const slide = slides[current];

  return (
    <section className="hero-slider">
      {/* Background Images */}
      {slides.map((s, i) => (
        <div
          key={s.id}
          className={`hero-slide-bg ${i === current ? 'active' : ''}`}
          style={{ backgroundImage: `url(${s.image})` }}
        />
      ))}

      {/* Overlay */}
      <div className="hero-slider-overlay" />

      {/* Content */}
      <div className={`hero-slider-content ${animating ? `exit-${direction}` : 'enter'}`}>
        <span className="hero-badge animate-fade-up" style={{ '--delay': '0ms' }}>{slide.badge}</span>
        <h1 className="hero-title animate-fade-up" style={{ '--delay': '100ms' }}>
          {slide.title.split('\n').map((line, i) => (
            <span key={i}>{line}<br /></span>
          ))}
        </h1>
        <p className="hero-subtitle animate-fade-up" style={{ '--delay': '200ms' }}>
          {slide.subtitle}
        </p>
        <div className="hero-cta-row animate-fade-up" style={{ '--delay': '300ms' }}>
          {slide.ctaExternal ? (
            <a
              href={slide.ctaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-cta-btn"
              style={{ background: slide.accent }}
            >
              {slide.cta}
            </a>
          ) : (
            <Link to={slide.ctaLink} className="hero-cta-btn" style={{ background: slide.accent }}>
              {slide.cta}
            </Link>
          )}
          {!slide.ctaExternal && (
  <a
    href="https://wa.me/+94705122847"
    target="_blank"
    rel="noopener noreferrer"
    className="hero-cta-btn hero-cta-outline"
  >
    💬 WhatsApp Us
  </a>
)}
        </div>
      </div>

      {/* Nav Arrows */}
      <button
        className="hero-arrow hero-arrow-left"
        onClick={() => { goPrev(); resetTimer(); }}
        aria-label="Previous slide"
      >
        ‹
      </button>
      <button
        className="hero-arrow hero-arrow-right"
        onClick={() => { goNext(); resetTimer(); }}
        aria-label="Next slide"
      >
        ›
      </button>

      {/* Dots */}
      <div className="hero-dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`hero-dot ${i === current ? 'active' : ''}`}
            onClick={() => { goTo(i, i > current ? 'next' : 'prev'); resetTimer(); }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="hero-progress">
        <div
          key={current}
          className="hero-progress-fill"
          style={{ animationDuration: `${AUTO_INTERVAL}ms` }}
        />
      </div>
    </section>
  );
}

export default HeroSlider;
