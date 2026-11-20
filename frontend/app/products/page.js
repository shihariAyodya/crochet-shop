import ProductsPage from '../../src/views/ProductsPage';
import { getProducts } from '../../src/lib/products';

// Re-check the database at most once a minute, so new products show up automatically
export const revalidate = 60;

export const metadata = {
  title: 'Our Collection | Shizelle',
  description: 'Browse all our handcrafted crochet pieces. Each one is unique and made to order in Sri Lanka.',
};

export default async function Page() {
  const products = await getProducts();
  return <ProductsPage products={products} />;
}
