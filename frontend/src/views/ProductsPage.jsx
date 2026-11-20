'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FiSliders, FiChevronDown, FiCheck, FiX } from 'react-icons/fi';
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

/* ── Filter helpers ─────────────────────────────────────── */
const SIZE_ORDER = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'One Size'];
const sizeRank = (s) => {
  const i = SIZE_ORDER.indexOf(s);
  return i === -1 ? SIZE_ORDER.length : i;
};

// "Rs. 2,800" -> 2800
const parsePrice = (text) => {
  const match = String(text || '').replace(/,/g, '').match(/\d+(\.\d+)?/);
  const n = match ? Number(match[0]) : NaN;
  return Number.isFinite(n) && n > 0 ? n : null;
};

// Lowest price of a product (handles per-size prices)
const minPrice = (p) => {
  const values = p.prices ? Object.values(p.prices) : [p.price];
  const nums = values.map(parsePrice).filter((n) => n !== null);
  return nums.length ? Math.min(...nums) : null;
};

const PRICE_RANGES = [
  { key: 'under-2500', label: 'Under Rs. 2,500', test: (n) => n < 2500 },
  { key: '2500-3500', label: 'Rs. 2,500 to 3,500', test: (n) => n >= 2500 && n <= 3500 },
  { key: 'over-3500', label: 'Over Rs. 3,500', test: (n) => n > 3500 },
];

const SORTS = [
  { key: 'featured', label: 'Featured' },
  { key: 'price-asc', label: 'Price: low to high' },
  { key: 'price-desc', label: 'Price: high to low' },
  { key: 'newest', label: 'Newest first' },
  { key: 'name', label: 'Name: A to Z' },
];

const swatchBg = (hex) =>
  Array.isArray(hex) ? `linear-gradient(135deg, ${hex[0]} 50%, ${hex[1]} 50%)` : hex;

const toggleIn = (list, value) =>
  list.includes(value) ? list.filter((v) => v !== value) : [...list, value];

function ProductsPage({ products = [] }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [hoveredId, setHoveredId] = useState(null);
  const [visible, setVisible] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const gridRef = useRef(null);

  // Extra filters
  const [sizes, setSizes] = useState([]);
  const [colours, setColours] = useState([]);
  const [priceRange, setPriceRange] = useState(null);
  const [inStock, setInStock] = useState(false);
  const [sort, setSort] = useState('featured');
  const [openMenu, setOpenMenu] = useState(null); // 'size' | 'colour' | 'price' | 'sort' | null
  const toolsRef = useRef(null);

  const categories = ['All', ...new Set(products.map((p) => p.category))];

  // Products in the chosen category + search (before size/colour/price filters)
  const baseProducts = products.filter((p) => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  // Options to choose from, taken from the products themselves
  const allSizes = [...new Set(products.flatMap((p) => p.sizes))].sort((a, b) => sizeRank(a) - sizeRank(b));
  const allColours = [];
  products.forEach((p) =>
    p.colors.forEach((c) => {
      if (!allColours.some((x) => x.name.toLowerCase() === c.name.toLowerCase())) {
        allColours.push({ name: c.name, hex: c.hex });
      }
    })
  );

  const matchesFilters = (p) => {
    const sizeOk = sizes.length === 0 || p.sizes.some((s) => sizes.includes(s));
    const colourOk =
      colours.length === 0 ||
      p.colors.some((c) => colours.includes(c.name) && (!inStock || c.available !== false));
    const stockOk = !inStock || p.colors.some((c) => c.available !== false);
    const range = PRICE_RANGES.find((r) => r.key === priceRange);
    const price = minPrice(p);
    const priceOk = !range || (price !== null && range.test(price));
    return sizeOk && colourOk && stockOk && priceOk;
  };

  const filteredProducts = baseProducts.filter(matchesFilters);

  if (sort !== 'featured') {
    filteredProducts.sort((a, b) => {
      if (sort === 'name') return a.name.localeCompare(b.name);
      if (sort === 'newest') return b.id - a.id;
      const pa = minPrice(a) ?? Infinity;
      const pb = minPrice(b) ?? Infinity;
      return sort === 'price-asc' ? pa - pb : pb - pa;
    });
  }

  const activeFilterCount = sizes.length + colours.length + (priceRange ? 1 : 0) + (inStock ? 1 : 0);

  const clearFilters = () => {
    setSizes([]);
    setColours([]);
    setPriceRange(null);
    setInStock(false);
    setAnimKey((k) => k + 1);
  };

  // Any filter change replays the grid animation
  const applyFilter = (fn) => {
    fn();
    setAnimKey((k) => k + 1);
  };

  // Close the open dropdown when clicking outside it or pressing Esc
  useEffect(() => {
    if (!openMenu) return;
    const onDown = (e) => {
      if (toolsRef.current && !toolsRef.current.contains(e.target)) setOpenMenu(null);
    };
    const onKey = (e) => e.key === 'Escape' && setOpenMenu(null);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [openMenu]);

  const toggleMenu = (name) => setOpenMenu((m) => (m === name ? null : name));

  // Blank tiles only on the "All" view with no search or filters, so results stay accurate
  const blanks =
    activeCategory === 'All' && !search && activeFilterCount === 0
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
            Browse all our handcrafted crochet pieces. Each one is unique and made to order.
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

      {/* ── Results + filter toolbar ── */}
      <div className="pp-toolbar">
        <div className="pp-toolbar-row">
          <span className="pp-results-info">
            Showing <strong>{filteredProducts.length}</strong> product{filteredProducts.length !== 1 ? 's' : ''}
            {activeCategory !== 'All' && <> in <em>{activeCategory}</em></>}
            {search && <> matching "<em>{search}</em>"</>}
          </span>

          <div className="pp-tools" ref={toolsRef}>
            <span className="pp-tools-label"><FiSliders /> Filter</span>

            {/* Size */}
            <div className="pp-dd">
              <button
                className={`pp-tool ${sizes.length ? 'is-active' : ''} ${openMenu === 'size' ? 'is-open' : ''}`}
                onClick={() => toggleMenu('size')}
                aria-expanded={openMenu === 'size'}
              >
                Size {sizes.length > 0 && <span className="pp-tool-badge">{sizes.length}</span>}
                <FiChevronDown className="pp-tool-chevron" />
              </button>
              {openMenu === 'size' && (
                <div className="pp-menu">
                  <p className="pp-menu-title">Size</p>
                  <div className="pp-size-grid">
                    {allSizes.map((s) => (
                      <button
                        key={s}
                        className={`pp-size-chip ${sizes.includes(s) ? 'is-on' : ''}`}
                        onClick={() => applyFilter(() => setSizes((v) => toggleIn(v, s)))}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                  {sizes.length > 0 && (
                    <button className="pp-menu-reset" onClick={() => applyFilter(() => setSizes([]))}>Clear sizes</button>
                  )}
                </div>
              )}
            </div>

            {/* Colour */}
            <div className="pp-dd">
              <button
                className={`pp-tool ${colours.length ? 'is-active' : ''} ${openMenu === 'colour' ? 'is-open' : ''}`}
                onClick={() => toggleMenu('colour')}
                aria-expanded={openMenu === 'colour'}
              >
                Colour {colours.length > 0 && <span className="pp-tool-badge">{colours.length}</span>}
                <FiChevronDown className="pp-tool-chevron" />
              </button>
              {openMenu === 'colour' && (
                <div className="pp-menu pp-menu-wide">
                  <p className="pp-menu-title">Colour</p>
                  <div className="pp-colour-grid">
                    {allColours.map((c) => {
                      const on = colours.includes(c.name);
                      return (
                        <button
                          key={c.name}
                          className={`pp-colour-opt ${on ? 'is-on' : ''}`}
                          onClick={() => applyFilter(() => setColours((v) => toggleIn(v, c.name)))}
                        >
                          <span className="pp-colour-dot" style={{ background: swatchBg(c.hex) }}>
                            {on && <FiCheck />}
                          </span>
                          {c.name}
                        </button>
                      );
                    })}
                  </div>
                  {colours.length > 0 && (
                    <button className="pp-menu-reset" onClick={() => applyFilter(() => setColours([]))}>Clear colours</button>
                  )}
                </div>
              )}
            </div>

            {/* Price */}
            <div className="pp-dd">
              <button
                className={`pp-tool ${priceRange ? 'is-active' : ''} ${openMenu === 'price' ? 'is-open' : ''}`}
                onClick={() => toggleMenu('price')}
                aria-expanded={openMenu === 'price'}
              >
                Price {priceRange && <span className="pp-tool-badge">1</span>}
                <FiChevronDown className="pp-tool-chevron" />
              </button>
              {openMenu === 'price' && (
                <div className="pp-menu">
                  <p className="pp-menu-title">Price</p>
                  {PRICE_RANGES.map((r) => (
                    <button
                      key={r.key}
                      className={`pp-menu-opt ${priceRange === r.key ? 'is-on' : ''}`}
                      onClick={() => {
                        applyFilter(() => setPriceRange((v) => (v === r.key ? null : r.key)));
                        setOpenMenu(null);
                      }}
                    >
                      <span className="pp-radio" />
                      {r.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* In stock */}
            <button
              className={`pp-tool pp-tool-toggle ${inStock ? 'is-active' : ''}`}
              onClick={() => applyFilter(() => setInStock((v) => !v))}
              aria-pressed={inStock}
            >
              <span className="pp-switch" aria-hidden="true" />
              In stock
            </button>

            {/* Sort */}
            <div className="pp-dd pp-dd-sort">
              <button
                className={`pp-tool pp-tool-sort ${openMenu === 'sort' ? 'is-open' : ''}`}
                onClick={() => toggleMenu('sort')}
                aria-expanded={openMenu === 'sort'}
              >
                <span className="pp-sort-prefix">Sort:</span> {SORTS.find((x) => x.key === sort).label}
                <FiChevronDown className="pp-tool-chevron" />
              </button>
              {openMenu === 'sort' && (
                <div className="pp-menu pp-menu-right">
                  {SORTS.map((o) => (
                    <button
                      key={o.key}
                      className={`pp-menu-opt ${sort === o.key ? 'is-on' : ''}`}
                      onClick={() => {
                        applyFilter(() => setSort(o.key));
                        setOpenMenu(null);
                      }}
                    >
                      {o.label}
                      {sort === o.key && <FiCheck className="pp-menu-check" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Active filter chips */}
        {activeFilterCount > 0 && (
          <div className="pp-chips">
            {sizes.map((s) => (
              <button key={`s-${s}`} className="pp-chip" onClick={() => applyFilter(() => setSizes((v) => v.filter((x) => x !== s)))}>
                Size {s} <FiX />
              </button>
            ))}
            {colours.map((c) => {
              const hex = allColours.find((x) => x.name === c)?.hex;
              return (
                <button key={`c-${c}`} className="pp-chip" onClick={() => applyFilter(() => setColours((v) => v.filter((x) => x !== c)))}>
                  <span className="pp-chip-dot" style={{ background: swatchBg(hex) }} />
                  {c} <FiX />
                </button>
              );
            })}
            {priceRange && (
              <button className="pp-chip" onClick={() => applyFilter(() => setPriceRange(null))}>
                {PRICE_RANGES.find((r) => r.key === priceRange).label} <FiX />
              </button>
            )}
            {inStock && (
              <button className="pp-chip" onClick={() => applyFilter(() => setInStock(false))}>
                In stock <FiX />
              </button>
            )}
            <button className="pp-chips-clear" onClick={clearFilters}>Clear all</button>
          </div>
        )}
      </div>

      {/* ── Grid ── */}
      <div className={`pp-grid ${visible ? 'pp-grid-visible' : ''}`} ref={gridRef} key={animKey}>
        {filteredProducts.length === 0 ? (
          <div className="pp-empty">
            <span className="pp-empty-icon">🧶</span>
            <p>No products match these filters.</p>
            {activeFilterCount > 0 && (
              <button className="pp-empty-btn" onClick={clearFilters}>Clear filters</button>
            )}
          </div>
        ) : (
          filteredProducts.map((product, i) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="pp-card"
              style={{ '--card-delay': `${Math.min(i * 80, 480)}ms` }}
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Image */}
              <div className="pp-card-img-wrap">
                {product.images.length > 0 ? (
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