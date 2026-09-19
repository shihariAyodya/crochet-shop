import { Link } from 'react-router-dom';
import './Products.css';
import { products } from '../data/products';

function Products() {
  const featured = products.slice(0, 3);

  return (
    <section className="products" id="products">
      <h2>Featured Products</h2>
      <div className="products-grid">
        {featured.map((product) => (
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

export default Products;