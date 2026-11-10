import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import './ProductsPage.css';

const categoryEmojis = {
  All: '✨',
  Meshtops: '🌿',
  CropTops: '🌸',
  Cardigans: '🧶',
  Beachwear: '🏖️',
  Baby: '👶',
};

// Total tiles on the "All" view: real products first, then "Coming soon" tiles
const TOTAL_TILES = 15;

function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [hoveredId, setHoveredId] = useState(null);
  const [visible, setVisible] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const gridRef = useRef(null);

  const categories = ['All', ...new Set(products.map((p) => p.category))];

  const filteredProducts = products.filter((p) => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  // Blank tiles only on the "All" view with no search, so filters stay accurate
  const blanks =
    activeCategory === 'All' && !search
      ? Math.max(0, TOTAL_TILES - filteredProducts.length)
      : 0;

  const getCategoryCount = (cat) =>
    cat === 'All' ? products.length : products.filter((p) => p.category === cat).length;

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setAnimKey((k) => k + 1);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (gridRef.current) observer.observe(gridRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="pp-page">
      {/* ── Page Header ── */}
      <div className="pp-header">
        <div className="pp-header-inner">
          <span className="pp-header-label">Handmade with Love</span>
          <h1 className="pp-header-title">Our Collection</h1>
          <p className="pp-header-sub">
            Browse all our handcrafted crochet pieces — each one unique, made to order.
          </p>

          {/* Search */}
          <div className="pp-search-wrap">
            <span className="pp-search-icon">🔍</span>
            <input
              className="pp-search"
              type="text"
              placeholder="Search products…"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setAnimKey((k) => k + 1); }}
            />
            {search && (
              <button className="pp-search-clear" onClick={() => { setSearch(''); setAnimKey((k) => k + 1); }}>✕</button>
            )}
          </div>
        </div>

        {/* Decorative blobs */}
        <div className="pp-blob pp-blob-1" />
        <div className="pp-blob pp-blob-2" />
      </div>

      {/* ── Filters ── */}
      <div className="pp-filters-wrap">
        <div className="pp-filters">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`pp-filter-pill ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => handleCategoryChange(cat)}
            >
              <span className="pp-filter-emoji">{categoryEmojis[cat] || '🏷️'}</span>
              {cat}
              <span className="pp-filter-count">{getCategoryCount(cat)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Results Info ── */}
      <div className="pp-results-info">
        <span>
          Showing <strong>{filteredProducts.length}</strong> product{filteredProducts.length !== 1 ? 's' : ''}
          {activeCategory !== 'All' && <> in <em>{activeCategory}</em></>}
          {search && <> matching "<em>{search}</em>"</>}
        </span>
      </div>

      {/* ── Grid ── */}
      <div className={`pp-grid ${visible ? 'pp-grid-visible' : ''}`} ref={gridRef} key={animKey}>
        {filteredProducts.length === 0 ? (
          <div className="pp-empty">
            <span className="pp-empty-icon">🧶</span>
            <p>No products found. Try a different search or category.</p>
          </div>
        ) : (
          filteredProducts.map((product, i) => (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className="pp-card"
              style={{ '--card-delay': `${Math.min(i * 80, 480)}ms` }}
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Image */}
              <div className="pp-card-img-wrap">
                {Array.isArray(product.images) ? (
                  <>
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className={`pp-card-img pp-img-primary ${hoveredId === product.id && product.images[1] ? 'pp-fade-out' : ''}`}
                    />
                    {product.images[1] && (
                      <img
                        src={product.images[1]}
                        alt={`${product.name} alt`}
                        className={`pp-card-img pp-img-hover ${hoveredId === product.id ? 'pp-fade-in' : ''}`}
                      />
                    )}
                  </>
                ) : (
                  <div className="pp-card-img-placeholder">
                    <span>🧶</span>
                  </div>
                )}

                {/* Overlay */}
                <div className="pp-card-overlay">
                  <span className="pp-view-label">View Details →</span>
                </div>

                {/* Category badge */}
                <span className="pp-cat-badge">
                  {categoryEmojis[product.category] || ''} {product.category}
                </span>

                {/* Colors count */}
                {product.colors && (
                  <span className="pp-colors-badge">
                    {product.colors.length} colors
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="pp-card-info">
                <h3 className="pp-card-name">{product.name}</h3>

                <div className="pp-card-bottom">
                  <span className="pp-card-price">
                    {product.price || (product.prices ? `From ${Object.values(product.prices)[0]}` : '')}
                  </span>

                  {/* Color swatches */}
                  <div className="pp-swatches">
                    {product.colors?.slice(0, 5).map((c, ci) => (
                      <span
                        key={ci}
                        className="pp-swatch"
                        title={c.name}
                        style={{
                          background: Array.isArray(c.hex)
                            ? `linear-gradient(135deg, ${c.hex[0]} 50%, ${c.hex[1]} 50%)`
                            : c.hex,
                          opacity: c.available === false ? 0.35 : 1,
                        }}
                      />
                    ))}
                    {(product.colors?.length || 0) > 5 && (
                      <span className="pp-swatch-more">+{product.colors.length - 5}</span>
                    )}
                  </div>
                </div>

                <p className="pp-card-desc">{product.description}</p>
              </div>
            </Link>
          ))
        )}

        {/* ── "Coming soon" placeholder tiles ── */}
        {Array.from({ length: blanks }).map((_, b) => (
          <div
            key={`blank-${b}`}
            className="pp-card pp-blank-card"
            style={{ '--card-delay': `${Math.min((filteredProducts.length + b) * 80, 480)}ms` }}
            aria-hidden="true"
          >
            <div className="pp-card-img-wrap pp-blank-image">
              <span className="pp-blank-icon">🧶</span>
              <span className="pp-blank-label">Coming soon</span>
            </div>
            <div className="pp-card-info">
              <span className="pp-blank-bar" />
              <span className="pp-blank-bar pp-blank-bar-sm" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;