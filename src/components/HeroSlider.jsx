import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './HeroSlider.css';
import heroImage from '../assets/coverpageNew.jpg';
import topPink1 from '../assets/products/top-pink-white-1.png.png';
import halterPink from '../assets/products/halter-pink.jpg';
import babyDressPink from '../assets/products/babydress-pink.jpeg';
import meshtopGreen from '../assets/products/meshtop-green.jpg';

const WHATSAPP_LINK = 'https://wa.me/94705122847';

const slides = [
  {
    id: 1,
    image: heroImage,
    badge: '✨ Handmade in Sri Lanka',
    title: 'Handmade Crochet,\nMade With Love',
    subtitle: 'Cozy, one-of-a-kind pieces crafted just for you.',
    cta: 'Order on WhatsApp',
    ctaLink: WHATSAPP_LINK,
    ctaExternal: true,
    accent: '#c98a94',
  },
  {
    id: 2,
    image: halterPink,
    badge: '🌸 New Arrivals',
    title: 'Halter\nCrop Tops',
    subtitle: 'Lightweight, stylish crochet tops perfect for sunny days — available in 6 beautiful colors.',
    cta: 'Shop Crop Tops',
    ctaLink: '/products',
    ctaExternal: false,
    accent: '#c67683',
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
    accent: '#718c5a',
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
    title: 'Ocean\nMesh Tops',
    subtitle: 'Breezy open-weave crochet mesh tops — perfect layered over a bralette or swimsuit.',
    cta: 'Shop Now',
    ctaLink: '/products',
    ctaExternal: false,
    accent: '#8aa374',
  },
];

const AUTO_INTERVAL = 3500; // 3.5 seconds per slide
const pad = (n) => String(n).padStart(2, '0');

function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(null);
  const [direction, setDirection] = useState('next');
  const touchStartX = useRef(null);

  // Load every slide image up front so the slide-in never shows a blank frame
  useEffect(() => {
    slides.forEach((s) => {
      const img = new Image();
      img.src = s.image;
    });
  }, []);

  // Auto-slide: move to the next slide every AUTO_INTERVAL ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setPrev(current);
      setDirection('next');
      setCurrent((current + 1) % slides.length);
    }, AUTO_INTERVAL);
    return () => clearTimeout(timer);
  }, [current]);

  const goTo = (index, dir) => {
    if (index === current) return;
    setPrev(current);
    setDirection(dir ?? (index > current ? 'next' : 'prev'));
    setCurrent(index);
  };
  const goNext = () => goTo((current + 1) % slides.length, 'next');
  const goPrev = () => goTo((current - 1 + slides.length) % slides.length, 'prev');

  // Swipe on phones
  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) (dx < 0 ? goNext : goPrev)();
    touchStartX.current = null;
  };

  const slide = slides[current];
  const lines = slide.title.split('\n');

  return (
    <section
      className="hs"
      style={{ '--accent': slide.accent }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      aria-roledescription="carousel"
    >
      {/* Soft background decoration */}
      <div className="hs-bg-blob hs-bg-blob-1" aria-hidden="true" />
      <div className="hs-bg-blob hs-bg-blob-2" aria-hidden="true" />

      <div className="hs-inner">
        {/* ── LEFT: words ── */}
        <div className="hs-text" key={current}>
          <span className="hs-badge hs-anim" style={{ '--d': '0ms' }}>{slide.badge}</span>

          <h1 className="hs-title">
            {lines.map((line, i) => (
              <span
                key={i}
                className={`hs-title-line hs-anim ${i === lines.length - 1 && lines.length > 1 ? 'hs-title-accent' : ''}`}
                style={{ '--d': `${80 + i * 90}ms` }}
              >
                {line}
              </span>
            ))}
          </h1>

          <p className="hs-subtitle hs-anim" style={{ '--d': '280ms' }}>{slide.subtitle}</p>

          <div className="hs-ctas hs-anim" style={{ '--d': '360ms' }}>
            {slide.ctaExternal ? (
              <a href={slide.ctaLink} target="_blank" rel="noopener noreferrer" className="hs-btn hs-btn-primary">
                {slide.cta} <span aria-hidden="true">→</span>
              </a>
            ) : (
              <Link to={slide.ctaLink} className="hs-btn hs-btn-primary">
                {slide.cta} <span aria-hidden="true">→</span>
              </Link>
            )}
            {!slide.ctaExternal && (
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="hs-btn hs-btn-outline">
                💬 WhatsApp Us
              </a>
            )}
          </div>
        </div>

        {/* ── RIGHT: image ── */}
        <div className="hs-visual">
          <div className="hs-ring" aria-hidden="true" />
          <div className="hs-frame">
            {prev !== null && (
              <img key={`under-${prev}`} src={slides[prev].image} alt="" className="hs-img" />
            )}
            <img
              key={`in-${current}`}
              src={slide.image}
              alt={slide.title.replace('\n', ' ')}
              className={`hs-img hs-img-in hs-from-${direction}`}
            />
          </div>

          <span className="hs-chip hs-chip-1">🧶 100% Handmade</span>
          <span className="hs-chip hs-chip-2">💬 Order via WhatsApp</span>
        </div>

        {/* ── Controls (under the words) ── */}
        <div className="hs-controls">
          <div className="hs-arrows">
            <button className="hs-arrow" onClick={goPrev} aria-label="Previous slide">‹</button>
            <button className="hs-arrow" onClick={goNext} aria-label="Next slide">›</button>
          </div>

          <span className="hs-counter">
            <strong>{pad(current + 1)}</strong> / {pad(slides.length)}
          </span>

          {/* One bar per slide; the current one fills up while it's showing */}
          <div className="hs-segments">
            {slides.map((s, i) => (
              <button
                key={s.id}
                className={`hs-seg ${i < current ? 'hs-seg-done' : ''}`}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
              >
                {i === current && (
                  <span
                    key={current}
                    className="hs-seg-fill"
                    style={{ animationDuration: `${AUTO_INTERVAL}ms` }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSlider;