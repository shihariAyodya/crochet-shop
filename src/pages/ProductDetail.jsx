import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import './ProductDetail.css';
import ImageSlider from '../components/ImageSlider';

function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [orderItems, setOrderItems] = useState([]);

  if (!product) {
    return (
      <section className="product-detail">
        <p>Product not found.</p>
        <Link to="/products">Back to Products</Link>
      </section>
    );
  }

  const canAdd = selectedSize && selectedColor;

  const decreaseQty = () => setQuantity((q) => Math.max(1, q - 1));
  const increaseQty = () => setQuantity((q) => q + 1);

  const handleAddItem = () => {
    if (!canAdd) return;
    setOrderItems((items) => [
      ...items,
      { size: selectedSize, color: selectedColor, quantity },
    ]);
    // Reset selections so they can pick a different combo next
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
    message += `\n${index + 1})\nSize: ${item.size}\nColor: ${item.color}\nQuantity: ${item.quantity}\n`;
  });
  return message;
};

  const hasItems = orderItems.length > 0;

  return (
    <section className="product-detail">
      <Link to="/products" className="back-link">← Back to Products</Link>

      <div className="product-detail-content">
        <ImageSlider count={product.images} />

        <div className="product-detail-info">
          <h1>{product.name}</h1>
          <p className="product-detail-price">{product.price}</p>
          <p className="product-detail-description">{product.description}</p>

          <div className="product-detail-section">
            <h3>Select Size</h3>
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
                    style={{ backgroundColor: color.hex }}
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
                      {item.size} · {item.color} · Qty: {item.quantity}
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
    </section>
  );
}

export default ProductDetail;