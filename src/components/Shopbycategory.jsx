import { Link } from 'react-router-dom';
import { products } from '../data/products';

// "CropTops" → "Crop Tops"
const prettyName = (category) => category.replace(/([a-z])([A-Z])/g, '$1 $2');

// One tile per category, using the first product photo in that category
const categories = Object.values(
  products.reduce((acc, p) => {
    const c = (acc[p.category] ??= { name: p.category, count: 0, image: null });
    c.count += 1;
    if (!c.image && Array.isArray(p.images) && p.images[0]) c.image = p.images[0];
    return acc;
  }, {})
);

export default function ShopByCategory() {
  return (
    <section className="bg-cream px-5 py-16 lg:py-20">
      <div className="mx-auto max-w-[1200px]">
        <p className="mb-2 text-center text-xs font-bold uppercase tracking-[3px] text-charcoal/60">
          Find your piece
        </p>
        <h2 className="mb-10 text-center text-[clamp(28px,4vw,40px)] font-semibold text-rose-dark">
          Shop by Category
        </h2>

        {/* Swipeable row on phones, centred row on bigger screens */}
        <div className="-mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:justify-center sm:gap-8 sm:overflow-visible sm:px-0">
          {categories.map((c) => (
            <Link
              key={c.name}
              to={`/products?category=${encodeURIComponent(c.name)}`}
              className="group flex w-28 shrink-0 snap-start flex-col items-center text-center sm:w-36"
            >
              <div className="relative mb-3 size-28 overflow-hidden rounded-full bg-linear-to-br from-sage-light to-rose-light ring-4 ring-white shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition duration-300 group-hover:-translate-y-1 group-hover:ring-rose-light group-hover:shadow-[0_14px_32px_rgba(165,99,111,0.25)] sm:size-36">
                {c.image ? (
                  <img
                    src={c.image}
                    alt={prettyName(c.name)}
                    loading="lazy"
                    className="size-full object-cover transition duration-500 group-hover:scale-110"
                  />
                ) : (
                  <span className="flex size-full items-center justify-center text-4xl">🧶</span>
                )}
              </div>
              <span className="text-[15px] font-semibold text-charcoal transition-colors group-hover:text-rose-dark">
                {prettyName(c.name)}
              </span>
              <span className="text-xs text-charcoal/60">
                {c.count} {c.count === 1 ? 'piece' : 'pieces'}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}