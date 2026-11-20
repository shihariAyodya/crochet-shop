import Home from '../src/views/Home';
import { getProducts } from '../src/lib/products';
import { getShownFeedback } from '../src/lib/feedback';

// Re-check the database at most once a minute, so new products and reviews show up automatically
export const revalidate = 60;

export const metadata = {
  title: 'Shizelle | Handmade Crochet',
  description: 'Handmade crochet pieces, made with love in Sri Lanka. Every item is made to order, just for you.',
};

export default async function Page() {
  const [products, reviews] = await Promise.all([getProducts(), getShownFeedback()]);
  return <Home products={products} reviews={reviews} />;
}