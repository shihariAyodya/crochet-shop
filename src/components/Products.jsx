import './Products.css';

const products = [
  { id: 1, name: 'Cozy Crochet Scarf', price: 'Rs. 2,500' },
  { id: 2, name: 'Handmade Tote Bag', price: 'Rs. 3,200' },
  { id: 3, name: 'Crochet Baby Blanket', price: 'Rs. 4,800' },
];

function Products() {
  return (
    <section className="products" id="products">
      <h2>Featured Products</h2>
      <div className="products-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <div className="product-image-placeholder"></div>
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">{product.price}</p>
            
              <a href={`https://wa.me/94XXXXXXXXX?text=Hi! I'm interested in the ${product.name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="product-button"
            >
              Order on WhatsApp
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Products;