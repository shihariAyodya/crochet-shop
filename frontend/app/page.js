import Home from '../src/views/Home';
import { getProducts } from '../src/lib/products';

// Re-check the database at most once a minute, so new products show up automatically
export const revalidate = 60;

export const metadata = {
  title: 'Shizelle | Handmade Crochet',
  description: 'Handmade crochet pieces, made with love in Sri Lanka. Every item is made to order, just for you.',
};

export default async function Page() {
  const products = await getProducts();
  return <Home products={products} />;
}
