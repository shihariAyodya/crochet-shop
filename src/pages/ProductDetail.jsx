import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import ImageSlider from '../components/ImageSlider';
import './ProductDetail.css';
import sizeChart from '../assets/size-chart.jpg';

function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [orderItems, setOrderItems] = useState([]);
  const [showSizeChart, setShowSizeChart] = useState(false);

  if (!product) {
    return (
      <section className="product-detail">
        <p>Product not found.</p>
        <Link to="/products">Back to Products</Link>
      </section>
    );
  }

  const hasSizePricing = Boolean(product.prices);

  const getPriceForSize = (size) => {
    if (hasSizePricing) return product.prices[size];
    return product.price;
  };

  const selectedColorObj = product.colors.find((c) => c.name === selectedColor);
  const activeImageIndex =
    selectedColorObj && typeof selectedColorObj.imageIndex === 'number'
      ? selectedColorObj.imageIndex
      : undefined;

  const canAdd = selectedSize && selectedColor;

  const decreaseQty = () => setQuantity((q) => Math.max(1, q - 1));
  const increaseQty = () => setQuantity((q) => q + 1);

  const handleAddItem = () => {
    if (!canAdd) return;
    setOrderItems((items) => [
      ...items,
      { size: selectedSize, color: selectedColor, quantity },
    ]);
    setSelectedSize(null);
    setSelectedColor(null);
    setQuantity(1);
  };

  const handleRemoveItem = (index) => {
    setOrderItems((items) => items.filter((_, i) => i !== index));
  };

  const buildWhatsappMessage = () => {
    let message = `Hi! I'm interested in the ${product.name}\n`;
    orderItems.forEach((item, index) => {
      message += `\n${index + 1})\nSize: ${item.size}\nColor: ${item.color}\nQuantity: ${item.quantity}\nPrice: ${getPriceForSize(item.size)}\n`;
    });
    return message;
  };

  const hasItems = orderItems.length > 0;

  return (
    <section className="product-detail">
      <Link to="/products" className="back-link">← Back to Products</Link>

      <div className="product-detail-content">
        <ImageSlider images={product.images} activeIndex={activeImageIndex} />

        <div className="product-detail-info">
          <h1>{product.name}</h1>
          <p className="product-detail-price">
            {hasSizePricing
              ? (selectedSize ? getPriceForSize(selectedSize) : 'Select a size to see price')
              : product.price}
          </p>
          <p className="product-detail-description">{product.description}</p>

          <div className="product-detail-section">
            <div className="size-header">
              <h3>Select Size</h3>
              <button
                type="button"
                className="size-chart-link"
                onClick={() => setShowSizeChart(true)}
              >
                View Size Chart
              </button>
            </div>
            <ul className="size-list">
              {product.sizes.map((size) => (
                <li
                  key={size}
                  className={`size-item ${selectedSize === size ? 'selected' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </li>
              ))}
            </ul>
          </div>

          <div className="product-detail-section">
            <h3>Select Color</h3>
            <div className="color-swatches">
              {product.colors.map((color) => (
                <div
                  className="swatch-wrapper"
                  key={color.name}
                  title={color.name}
                  onClick={() => {
                    if (color.available) setSelectedColor(color.name);
                  }}
                >
                  <span
                    className={`swatch ${!color.available ? 'unavailable' : ''} ${
                      selectedColor === color.name ? 'selected' : ''
                    }`}
                    style={
                      Array.isArray(color.hex)
                        ? {
                            background: `linear-gradient(90deg, ${color.hex
                              .map((c, i) => {
                                const start = (i / color.hex.length) * 100;
                                const end = ((i + 1) / color.hex.length) * 100;
                                return `${c} ${start}% ${end}%`;
                              })
                              .join(', ')})`,
                          }
                        : { backgroundColor: color.hex }
                    }
                  ></span>
                  <span className="swatch-label">{color.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="product-detail-section">
            <h3>Quantity</h3>
            <div className="quantity-selector">
              <button type="button" className="qty-button" onClick={decreaseQty} aria-label="Decrease quantity">−</button>
              <span className="qty-value">{quantity}</span>
              <button type="button" className="qty-button" onClick={increaseQty} aria-label="Increase quantity">+</button>
            </div>
          </div>

          {!canAdd && (
            <p className="selection-hint">Select a size and color to add this combination.</p>
          )}

          <button
            type="button"
            className={`add-item-button ${!canAdd ? 'disabled' : ''}`}
            onClick={handleAddItem}
            disabled={!canAdd}
          >
            + Add This Combination
          </button>

          {hasItems && (
            <div className="product-detail-section order-list">
              <h3>Your Selections</h3>
              <ul className="order-items-list">
                {orderItems.map((item, index) => (
                  <li key={index} className="order-item">
                    <span>
                      {item.size} · {item.color} · Qty: {item.quantity} · {getPriceForSize(item.size)}
                    </span>
                    <button
                      type="button"
                      className="remove-item-button"
                      onClick={() => handleRemoveItem(index)}
                      aria-label="Remove this selection"
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {!hasItems && (
            <p className="selection-hint">Add at least one size/color combination before ordering.</p>
          )}

          
            <a href={
              hasItems
                ? `https://wa.me/94705924972?text=${encodeURIComponent(buildWhatsappMessage())}`
                : undefined
            }
            target="_blank"
            rel="noopener noreferrer"
            className={`product-detail-button ${!hasItems ? 'disabled' : ''}`}
            onClick={(e) => {
              if (!hasItems) e.preventDefault();
            }}
          >
            Order on WhatsApp
          </a>
        </div>
      </div>

      {showSizeChart && (
        <div className="size-chart-overlay" onClick={() => setShowSizeChart(false)}>
          <button
            className="size-chart-close"
            onClick={() => setShowSizeChart(false)}
            aria-label="Close size chart"
          >
            ✕
          </button>
          <img
            src={sizeChart}
            alt="Size chart"
            className="size-chart-image"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}

export default ProductDetail;