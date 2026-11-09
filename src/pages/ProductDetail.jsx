import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import sizeChart from '../assets/size-chart.jpg';

const WA_NUMBER = '94705924972';

// Joins class names, skipping false/null/undefined
const cx = (...classes) => classes.filter(Boolean).join(' ');

// Adds an item, or bumps the quantity if that size + colour is already in the list
const mergeItem = (items, item) => {
  const i = items.findIndex((x) => x.size === item.size && x.color === item.color);
  if (i === -1) return [...items, item];
  return items.map((x, j) => (j === i ? { ...x, quantity: x.quantity + item.quantity } : x));
};

/* Reusable class groups */
const sectionTitle =
  'm-0 flex items-center gap-2.5 text-xs font-bold uppercase tracking-[1.5px] text-charcoal/60';
const selectedLabel =
  'rounded-full bg-rose-light px-2.5 py-0.5 text-[11px] font-bold normal-case tracking-normal text-rose-dark';
const glassBtn =
  'flex items-center justify-center rounded-full border border-white/25 bg-white/15 text-white backdrop-blur-md transition-colors hover:bg-white/30';
const imgArrow =
  'absolute top-1/2 z-[2] flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 pb-0.5 text-2xl transition hover:scale-110 hover:bg-white opacity-100 min-[860px]:opacity-0 min-[860px]:group-hover:opacity-100';

export default function ProductDetail() {
  const { id } = useParams();

  // Start at the top whenever the product changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // key={id} gives every product a fresh state, so selections
  // don't carry over when clicking a "You Might Also Like" card
  return <ProductDetailContent key={id} id={Number(id)} />;
}

function ProductDetailContent({ id }) {
  const product = products.find((p) => p.id === id);
  const images = Array.isArray(product?.images) ? product.images : [];
  const imageCount = images.length;

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [orderItems, setOrderItems] = useState([]);
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  const [imgZoom, setImgZoom] = useState(false);
  const [addedAnim, setAddedAnim] = useState(false);

  // Sync image when color changes
  useEffect(() => {
    if (selectedColor && product) {
      const colorObj = product.colors.find((c) => c.name === selectedColor);
      if (colorObj && typeof colorObj.imageIndex === 'number') {
        setActiveImg(colorObj.imageIndex);
      }
    }
  }, [selectedColor, product]);

  // Modals: Esc closes, arrow keys change image, page behind doesn't scroll
  useEffect(() => {
    if (!imgZoom && !showSizeChart) return;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setImgZoom(false);
        setShowSizeChart(false);
      }
      if (imgZoom && imageCount > 1) {
        if (e.key === 'ArrowRight') setActiveImg((i) => (i + 1) % imageCount);
        if (e.key === 'ArrowLeft') setActiveImg((i) => (i - 1 + imageCount) % imageCount);
      }
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [imgZoom, showSizeChart, imageCount]);

  if (!product) {
    return (
      <div className="px-10 py-30 text-center text-lg text-charcoal">
        <span className="mb-4 block text-[56px]">🧶</span>
        <h2>Product not found</h2>
        <Link
          to="/products"
          className="mt-4 inline-block rounded-full bg-rose px-7 py-3 font-bold text-white transition-colors hover:bg-rose-dark"
        >
          ← Back to Products
        </Link>
      </div>
    );
  }

  const hasSizePricing = Boolean(product.prices);
  const getPriceForSize = (size) => (hasSizePricing ? product.prices[size] : product.price);

  const prevImg = () => setActiveImg((i) => (i - 1 + imageCount) % imageCount);
  const nextImg = () => setActiveImg((i) => (i + 1) % imageCount);

  const canAdd = Boolean(selectedSize && selectedColor);
  const hasItems = orderItems.length > 0;

  // The current selection is included in the order even if "Add" wasn't clicked
  const pendingItem = canAdd ? { size: selectedSize, color: selectedColor, quantity } : null;
  const itemsToOrder = pendingItem ? mergeItem(orderItems, pendingItem) : orderItems;
  const canOrder = itemsToOrder.length > 0;

  const handleAddItem = () => {
    if (!canAdd) return;
    setOrderItems((items) => mergeItem(items, pendingItem));
    setAddedAnim(true);
    setTimeout(() => setAddedAnim(false), 900);
    setSelectedSize(null);
    setSelectedColor(null);
    setQuantity(1);
  };

  const handleRemoveItem = (index) => {
    setOrderItems((items) => items.filter((_, i) => i !== index));
  };

  const buildWhatsappMessage = () => {
    let message = `Hi! I'm interested in the ${product.name}\n`;
    itemsToOrder.forEach((item, index) => {
      message += `\n${index + 1})\nSize: ${item.size}\nColor: ${item.color}\nQuantity: ${item.quantity}\nPrice: ${getPriceForSize(item.size)}\n`;
    });
    return message;
  };

  // Related products (same category, excluding current)
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id && Array.isArray(p.images))
    .slice(0, 3);

  return (
    <div className="min-h-screen animate-fade-up bg-cream">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 border-b border-black/5 bg-white px-5 py-3.5 text-sm text-charcoal/60 min-[860px]:px-8 lg:px-15 lg:py-5">
        <Link to="/" className="transition-colors hover:text-rose-dark">Home</Link>
        <span>›</span>
        <Link to="/products" className="transition-colors hover:text-rose-dark">Products</Link>
        <span>›</span>
        <span className="truncate font-semibold text-charcoal">{product.name}</span>
      </nav>

      {/* ── Main content ── */}
      <div className="mx-auto grid max-w-[1200px] items-start px-5 pt-6 pb-15 min-[860px]:grid-cols-2 min-[860px]:px-8 min-[860px]:pt-8 lg:px-15 lg:pt-10 lg:pb-20">
        {/* ── Gallery Column ── */}
        <div className="flex flex-col gap-3.5 min-[500px]:flex-row min-[860px]:sticky min-[860px]:top-20">
          {/* Thumbnails: below the image on phones, beside it on bigger screens */}
          {imageCount > 1 && (
            <div className="order-2 flex shrink-0 flex-row gap-2.5 min-[500px]:order-none min-[500px]:flex-col">
              {images.map((img, i) => (
                <button
                  key={i}
                  aria-label={`Show image ${i + 1}`}
                  onClick={() => setActiveImg(i)}
                  className={cx(
                    'size-15 shrink-0 overflow-hidden rounded-[10px] border-2 transition hover:scale-105 min-[500px]:size-18',
                    i === activeImg ? 'border-rose' : 'border-transparent'
                  )}
                >
                  <img src={img} alt="" className="size-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Main image */}
          <div
            className="group relative aspect-[3/4] flex-1 cursor-zoom-in overflow-hidden rounded-[20px] bg-sage-light"
            onClick={() => imageCount > 0 && setImgZoom(true)}
          >
            {imageCount > 0 ? (
              <>
                {images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={product.name}
                    className={cx(
                      'absolute inset-0 size-full object-cover transition duration-400',
                      i === activeImg ? 'scale-100 opacity-100' : 'scale-[1.02] opacity-0'
                    )}
                  />
                ))}
                <div className="pointer-events-none absolute right-3.5 bottom-3.5 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-charcoal/80 opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35M11 8v6M8 11h6" />
                  </svg>
                  Click to zoom
                </div>
              </>
            ) : (
              <div className="flex size-full items-center justify-center bg-linear-to-br from-sage-light to-rose-light text-6xl">
                🧶
              </div>
            )}

            {imageCount > 1 && (
              <>
                <button
                  aria-label="Previous image"
                  className={cx(imgArrow, 'left-3')}
                  onClick={(e) => { e.stopPropagation(); prevImg(); }}
                >‹</button>
                <button
                  aria-label="Next image"
                  className={cx(imgArrow, 'right-3')}
                  onClick={(e) => { e.stopPropagation(); nextImg(); }}
                >›</button>
                <div className="absolute bottom-3.5 left-3.5 rounded-full bg-black/45 px-2.5 py-1 text-xs font-semibold text-white">
                  {activeImg + 1} / {imageCount}
                </div>
              </>
            )}
          </div>
        </div>

        {/* ── Info Column ── */}
        <div className="flex flex-col pt-8 min-[860px]:pt-0 min-[860px]:pl-13">
          {/* self-start stops the tag stretching across the whole column */}
          <span className="mb-3 self-start rounded-full bg-sage-light px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-sage-dark">
            {product.category}
          </span>

          <h1 className="mt-0 mb-2.5 text-[clamp(26px,3.5vw,38px)] leading-[1.15] font-extrabold tracking-[-0.8px]">
            {product.name}
          </h1>

          <p
            className={cx(
              'mb-4',
              hasSizePricing && !selectedSize
                ? 'text-base font-medium text-charcoal/60'
                : 'text-[26px] font-bold text-rose-dark'
            )}
          >
            {hasSizePricing
              ? selectedSize ? getPriceForSize(selectedSize) : 'Select a size to see price'
              : product.price}
          </p>

          <p className="mb-6 text-base leading-relaxed text-charcoal/75">{product.description}</p>

          <div className="mb-6 h-px bg-black/10" />

          {/* ── Size ── */}
          <div className="mb-6">
            <div className="mb-3 flex items-center justify-between">
              <h3 className={sectionTitle}>
                Size
                {selectedSize && <span className={selectedLabel}>{selectedSize}</span>}
              </h3>
              <button
                onClick={() => setShowSizeChart(true)}
                className="text-sm font-semibold text-rose-dark underline underline-offset-2 transition-colors hover:text-rose"
              >
                📏 Size Chart
              </button>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={cx(
                    'min-w-12 rounded-full border-[1.5px] px-5 py-2.5 text-sm font-semibold transition',
                    selectedSize === size
                      ? 'border-charcoal bg-charcoal text-white shadow-[0_4px_12px_rgba(0,0,0,0.18)]'
                      : 'border-[#ddd] bg-white text-charcoal hover:border-rose hover:bg-rose-light hover:text-rose-dark'
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* ── Color ── */}
          <div className="mb-6">
            <h3 className={cx(sectionTitle, 'mb-3')}>
              Color
              {selectedColor && <span className={selectedLabel}>{selectedColor}</span>}
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  title={color.name}
                  disabled={!color.available}
                  onClick={() => setSelectedColor(color.name)}
                  className={cx(
                    'flex items-center gap-2 rounded-full border-[1.5px] bg-white px-3.5 py-2 text-sm font-semibold text-charcoal transition',
                    selectedColor === color.name
                      ? 'border-charcoal ring-2 ring-charcoal'
                      : 'border-[#e0e0e0] enabled:hover:border-rose enabled:hover:bg-rose-light',
                    !color.available && 'cursor-not-allowed opacity-60'
                  )}
                >
                  <span
                    className="size-5 shrink-0 rounded-full border border-black/10"
                    style={
                      Array.isArray(color.hex)
                        ? { background: `linear-gradient(135deg, ${color.hex.map((c, i) => `${c} ${i * (100 / color.hex.length)}% ${(i + 1) * (100 / color.hex.length)}%`).join(', ')})` }
                        : { backgroundColor: color.hex }
                    }
                  />
                  <span className={cx('leading-none', !color.available && 'line-through')}>{color.name}</span>
                  {!color.available && <span className="text-xs font-normal text-charcoal/70">Sold out</span>}
                </button>
              ))}
            </div>
          </div>

          {/* ── Quantity ── */}
          <div className="mb-2">
            <h3 className={cx(sectionTitle, 'mb-3')}>Quantity</h3>
            <div className="inline-flex items-center overflow-hidden rounded-full border-[1.5px] border-[#ddd] bg-white">
              <button
                aria-label="Decrease quantity"
                disabled={quantity <= 1}
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="flex size-[42px] items-center justify-center text-xl text-charcoal transition-colors hover:bg-sage-light disabled:opacity-40 disabled:hover:bg-transparent"
              >−</button>
              <span className="min-w-[42px] border-x-[1.5px] border-[#ddd] text-center text-base leading-[42px] font-bold">
                {quantity}
              </span>
              <button
                aria-label="Increase quantity"
                onClick={() => setQuantity((q) => q + 1)}
                className="flex size-[42px] items-center justify-center text-xl text-charcoal transition-colors hover:bg-sage-light"
              >+</button>
            </div>
          </div>

          {/* ── Hint (only one, only when needed) ── */}
          {!canAdd && !hasItems && (
            <p className="mt-3 mb-1 rounded-[10px] border-l-[3px] border-rose bg-rose-light/40 px-3.5 py-2.5 text-sm text-charcoal/75">
              👆 Choose a size and colour to order. Want more than one? Add each combination.
            </p>
          )}

          {/* ── Add Button ── */}
          <button
            onClick={handleAddItem}
            disabled={!canAdd}
            className={cx(
              'mt-2 mb-4 w-full rounded-[14px] px-6 py-3.5 text-[15px] font-bold tracking-[0.3px] transition duration-200',
              addedAnim
                ? 'animate-pop bg-green-600 text-white'
                : canAdd
                  ? 'bg-sage-dark text-white hover:-translate-y-0.5 hover:bg-sage hover:shadow-lg'
                  : 'cursor-not-allowed bg-[#e0dbd8] text-charcoal/50'
            )}
          >
            {addedAnim ? '✓ Added!' : hasItems ? '+ Add another combination' : '+ Add to selection'}
          </button>

          {/* ── Order List ── */}
          {hasItems && (
            <div className="mb-4 rounded-2xl border border-black/5 bg-linear-to-br from-[#fdf4f5] to-[#f0f5ee] p-5">
              <h3 className="mt-0 mb-3.5 flex items-center gap-2 text-sm font-bold text-charcoal">
                🛍️ Your Selections
                <span className="inline-flex size-5 items-center justify-center rounded-full bg-rose text-[11px] font-bold text-white">
                  {orderItems.length}
                </span>
              </h3>
              <ul className="flex flex-col gap-2">
                {orderItems.map((item, index) => (
                  <li
                    key={`${item.color}-${item.size}`}
                    className="flex items-center justify-between gap-3 rounded-[10px] bg-white px-3.5 py-2.5 text-sm text-charcoal shadow-[0_2px_6px_rgba(0,0,0,0.05)]"
                  >
                    <div className="flex flex-wrap items-center gap-1.5">
                      <strong>{item.color}</strong> · {item.size} · Qty {item.quantity}
                      <span className="ml-1 rounded-xl bg-rose-light px-2 py-0.5 text-xs font-bold text-rose-dark">
                        {getPriceForSize(item.size)}
                      </span>
                    </div>
                    <button
                      aria-label="Remove"
                      onClick={() => handleRemoveItem(index)}
                      className="shrink-0 px-0.5 text-[15px] text-charcoal/40 transition-colors hover:text-rose-dark"
                    >✕</button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* ── WhatsApp Button ── */}
          <a
            href={canOrder ? `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(buildWhatsappMessage())}` : undefined}
            target="_blank"
            rel="noopener noreferrer"
            aria-disabled={!canOrder}
            onClick={(e) => { if (!canOrder) e.preventDefault(); }}
            className={cx(
              'flex w-full items-center justify-center gap-2.5 rounded-[14px] px-6 py-4 text-base font-bold tracking-[0.3px] text-white transition duration-200',
              canOrder
                ? 'bg-[#25d366] shadow-[0_6px_20px_rgba(37,211,102,0.35)] hover:-translate-y-0.5 hover:bg-[#20ba58] hover:shadow-[0_12px_28px_rgba(37,211,102,0.45)]'
                : 'cursor-not-allowed bg-[#ccc]'
            )}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Order on WhatsApp
          </a>

          {/* Tell the customer their un-added selection is included */}
          {pendingItem && hasItems && (
            <p className="mt-2 text-center text-sm text-charcoal/70">
              Also includes: {pendingItem.color} · {pendingItem.size} · Qty {pendingItem.quantity}
            </p>
          )}

          {/* ── Trust badges ── */}
          <div className="mt-4.5 flex flex-wrap gap-2">
            {['🧶 Handmade', '🚚 Made to order', '💬 WhatsApp support'].map((t) => (
              <span key={t} className="rounded-full bg-[#f0eeec] px-3 py-1.5 text-xs font-semibold text-charcoal/70">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Related Products ── */}
      {related.length > 0 && (
        <section className="border-t border-black/5 bg-white px-5 py-10 min-[860px]:px-8 min-[860px]:py-12 lg:p-15">
          <h2 className="mt-0 mb-7 text-2xl font-bold tracking-[-0.4px]">You Might Also Like</h2>
          <div className="grid max-w-[1080px] grid-cols-2 gap-3 min-[500px]:gap-5 min-[860px]:grid-cols-3">
            {related.map((p) => (
              <Link
                key={p.id}
                to={`/products/${p.id}`}
                className="group overflow-hidden rounded-2xl bg-cream transition duration-200 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.1)]"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-sage-light">
                  <img
                    src={p.images[0]}
                    alt={p.name}
                    className={cx(
                      'absolute inset-0 size-full object-cover transition duration-400',
                      p.images[1] && 'group-hover:opacity-0'
                    )}
                  />
                  {p.images[1] && (
                    <img
                      src={p.images[1]}
                      alt=""
                      className="absolute inset-0 size-full scale-105 object-cover opacity-0 transition duration-400 group-hover:scale-100 group-hover:opacity-100"
                    />
                  )}
                </div>
                <div className="px-4 pt-3.5 pb-4">
                  <p className="mb-1 text-sm font-bold text-charcoal">{p.name}</p>
                  <p className="text-sm font-bold text-rose-dark">
                    {p.price || Object.values(p.prices || {})[0]}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── Zoom Modal ── */}
      {imgZoom && imageCount > 0 && (
        <div
          className="fixed inset-0 z-[1000] flex animate-fade-in items-center justify-center bg-black/90"
          onClick={() => setImgZoom(false)}
        >
          <button aria-label="Close" className={cx(glassBtn, 'absolute top-5 right-5 size-11 text-lg')} onClick={() => setImgZoom(false)}>✕</button>
          <img
            src={images[activeImg]}
            alt={product.name}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[88vh] max-w-[88vw] rounded-2xl object-contain shadow-[0_24px_80px_rgba(0,0,0,0.5)]"
          />
          {imageCount > 1 && (
            <>
              <button
                aria-label="Previous image"
                className={cx(glassBtn, 'absolute top-1/2 left-2 size-13 -translate-y-1/2 pb-0.5 text-3xl sm:left-6')}
                onClick={(e) => { e.stopPropagation(); prevImg(); }}
              >‹</button>
              <button
                aria-label="Next image"
                className={cx(glassBtn, 'absolute top-1/2 right-2 size-13 -translate-y-1/2 pb-0.5 text-3xl sm:right-6')}
                onClick={(e) => { e.stopPropagation(); nextImg(); }}
              >›</button>
            </>
          )}
        </div>
      )}

      {/* ── Size Chart Modal ── */}
      {showSizeChart && (
        <div
          className="fixed inset-0 z-[1000] flex animate-fade-in items-center justify-center bg-black/90"
          onClick={() => setShowSizeChart(false)}
        >
          <button aria-label="Close" className={cx(glassBtn, 'absolute top-5 right-5 size-11 text-lg')} onClick={() => setShowSizeChart(false)}>✕</button>
          <img
            src={sizeChart}
            alt="Size chart"
            onClick={(e) => e.stopPropagation()}
            className="max-h-[88vh] max-w-[88vw] rounded-2xl object-contain shadow-[0_24px_80px_rgba(0,0,0,0.5)]"
          />
        </div>
      )}
    </div>
  );
}