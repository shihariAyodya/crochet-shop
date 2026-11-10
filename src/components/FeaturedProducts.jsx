import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './FeaturedProducts.css';
import { products } from '../data/products';

const TOTAL_TILES = 10; // real products first, the rest are "Coming soon" tiles

function FeaturedProducts() {
  const [visible, setVisible] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);
  const sectionRef = useRef(null);

  // Only products that actually have a photo
  const featured = products
    .filter((p) => Array.isArray(p.images) && p.images.length > 0)
    .slice(0, TOTAL_TILES);

  // Empty tiles to fill the grid up to TOTAL_TILES
  const blanks = Math.max(0, TOTAL_TILES - featured.length);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="featured-products" id="products" ref={sectionRef}>
      <div className="featured-products-header">
        <span className="fp-label">Our Collection</span>
        <h2 className="fp-heading">Featured Products</h2>
        <p className="fp-subtext">Handcrafted with care — each piece is unique and made with premium cotton yarn.</p>
      </div>

      <div className={`fp-grid ${visible ? 'fp-visible' : ''}`}>
        {featured.map((product, i) => (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className="fp-card"
            style={{ '--card-delay': `${i * 70}ms` }}
            onMouseEnter={() => setHoveredId(product.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="fp-card-image-wrap">
              <img
                src={product.images[0]}
                alt={product.name}
                loading="lazy"
                className={`fp-card-img fp-card-img-primary ${hoveredId === product.id && product.images[1] ? 'fade-out' : ''}`}
              />
              {product.images[1] && (
                <img
                  src={product.images[1]}
                  alt=""
                  loading="lazy"
                  className={`fp-card-img fp-card-img-hover ${hoveredId === product.id ? 'fade-in' : ''}`}
                />
              )}
              <div className="fp-card-overlay">
                <span className="fp-quick-view">View Details →</span>
              </div>
              {i === 0 && <span className="fp-badge fp-badge-new">Best Seller</span>}
              {i === 1 && <span className="fp-badge fp-badge-hot">Popular</span>}
            </div>

            <div className="fp-card-info">
              <span className="fp-card-category">{product.category}</span>
              <div className="fp-card-row">
                <h3 className="fp-card-name" title={product.name}>{product.name}</h3>
                <span className="fp-card-price">{product.price || Object.values(product.prices || {})[0]}</span>
              </div>
            </div>
          </Link>
        ))}

        {/* Placeholder tiles (no image) */}
        {Array.from({ length: blanks }).map((_, b) => (
          <div
            key={`blank-${b}`}
            className="fp-card fp-blank-card"
            style={{ '--card-delay': `${(featured.length + b) * 70}ms` }}
            aria-hidden="true"
          >
            <div className="fp-card-image-wrap fp-blank-image">
              <span className="fp-blank-icon">🧶</span>
              <span className="fp-blank-label">Coming soon</span>
            </div>
            <div className="fp-card-info">
              <span className="fp-blank-bar fp-blank-bar-sm" />
              <span className="fp-blank-bar" />
            </div>
          </div>
        ))}
      </div>

      <div className="fp-view-all">
        <Link to="/products" className="fp-view-all-btn">
          View Full Collection
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}

export default FeaturedProducts;