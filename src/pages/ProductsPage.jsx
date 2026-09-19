import { useState } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import '../components/Products.css';
import './ProductsPage.css';

function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', ...new Set(products.map((p) => p.category))];

  const filteredProducts =
    activeCategory === 'All'
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <section className="products" style={{ paddingTop: '60px' }}>
      <h2>All Products</h2>

      <div className="category-tiles">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-tile ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="products-grid">
        {filteredProducts.map((product) => (
          <Link to={`/products/${product.id}`} className="product-card" key={product.id}>
            {Array.isArray(product.images) ? (
              <img src={product.images[0]} alt={product.name} className="product-card-image" />
            ) : (
              <div className="product-image-placeholder"></div>
            )}
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">{product.price}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default ProductsPage;