import ProductDetail from '../../../src/views/ProductDetail';
import { getProducts, getProduct } from '../../../src/lib/products';

// Re-check the database at most once a minute.
// Products added later (not known at build time) are created on first visit.
export const revalidate = 60;

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ id: String(product.id) }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return { title: 'Product Not Found | Shizelle' };
  }

  const priceText = product.price || (product.prices ? `From ${Object.values(product.prices)[0]}` : '');
  const title = `${product.name}${priceText ? `, ${priceText}` : ''} | Shizelle`;
  const description = `${product.description} ${priceText ? `Price: ${priceText}.` : ''} 100% handmade crochet in Sri Lanka.`.trim();
  const imageUrl = product.images[0] || null;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      images: imageUrl ? [{ url: imageUrl, alt: product.name }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

export default async function ProductDetailPage({ params }) {
  const { id } = await params;
  const products = await getProducts();
  return <ProductDetail id={id} products={products} />;
}
