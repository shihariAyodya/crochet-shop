import { products } from '../../../src/data/products';
import ProductDetail from '../../../src/views/ProductDetail';

export function generateStaticParams() {
  return products.map((product) => ({
    id: String(product.id),
  }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const product = products.find((p) => String(p.id) === String(resolvedParams.id));

  if (!product) {
    return {
      title: 'Product Not Found — Shizelle',
    };
  }

  const priceText = product.price || (product.prices ? `From ${Object.values(product.prices)[0]}` : '');
  const title = `${product.name} — ${priceText} | Shizelle`;
  const description = `${product.description} ${priceText ? `Price: ${priceText}.` : ''} 100% handmade crochet in Sri Lanka.`;

  let imageUrl = null;
  if (Array.isArray(product.images) && product.images.length > 0) {
    const firstImg = product.images[0];
    imageUrl = typeof firstImg === 'object' && firstImg?.src ? firstImg.src : firstImg;
  }

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      images: imageUrl
        ? [
            {
              url: imageUrl,
              alt: product.name,
            },
          ]
        : [],
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
  const resolvedParams = await params;
  return <ProductDetail id={resolvedParams.id} />;
}
