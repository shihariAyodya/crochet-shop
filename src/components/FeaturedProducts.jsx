import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './FeaturedProducts.css';
import { products } from '../data/products';

function FeaturedProducts() {
  const [visible, setVisible] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);
  const sectionRef = useRef(null);

  // Filter to products with real images
  const featured = products.filter(p => Array.isArray(p.images)).slice(0, 4);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
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
            style={{ '--card-delay': `${i * 120}ms` }}
            onMouseEnter={() => setHoveredId(product.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="fp-card-image-wrap">
              {/* Primary + hover image */}
              <img
                src={product.images[0]}
                alt={product.name}
                className={`fp-card-img fp-card-img-primary ${hoveredId === product.id ? 'fade-out' : ''}`}
              />
              {product.images[1] && (
                <img
                  src={product.images[1]}
                  alt={`${product.name} alternate`}
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
              <h3 className="fp-card-name">{product.name}</h3>
              <div className="fp-card-footer">
                <span className="fp-card-price">{product.price || Object.values(product.prices || {})[0]}</span>
                <div className="fp-color-dots">
                  {product.colors?.slice(0, 4).map((c, ci) => (
                    <span
                      key={ci}
                      className="fp-color-dot"
                      title={c.name}
                      style={{
                        background: Array.isArray(c.hex)
                          ? `linear-gradient(135deg, ${c.hex[0]} 50%, ${c.hex[1]} 50%)`
                          : c.hex,
                      }}
                    />
                  ))}
                  {(product.colors?.length || 0) > 4 && (
                    <span className="fp-color-more">+{product.colors.length - 4}</span>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="fp-view-all">
        <Link to="/products" className="fp-view-all-btn">
          View Full Collection
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </Link>
      </div>
    </section>
  );
}

export default FeaturedProducts;
