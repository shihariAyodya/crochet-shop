import { Link } from 'react-router-dom';
import { products } from '../data/products';

// Uses two of your product photos. Swap in your own workspace / yarn photos if you have them.
const photos = products
  .filter((p) => Array.isArray(p.images) && p.images[0])
  .slice(0, 2)
  .map((p) => ({ src: p.images[0], alt: p.name }));

export default function StoryTeaser() {
  return (
    <section className="overflow-hidden bg-cream px-5 py-16 lg:py-24">
      <div className="mx-auto grid max-w-[1100px] items-center gap-12 md:grid-cols-2 md:gap-16">
        {/* Overlapping photos */}
        <div className="relative mx-auto h-[380px] w-full max-w-[420px] sm:h-[440px]">
          <div className="absolute -top-4 -left-4 size-32 rounded-full bg-rose-light/70 blur-2xl" aria-hidden="true" />
          {photos[0] && (
            <img
              src={photos[0].src}
              alt={photos[0].alt}
              loading="lazy"
              className="absolute top-0 left-0 h-[85%] w-[70%] rotate-[-3deg] rounded-3xl object-cover shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
            />
          )}
          {photos[1] && (
            <img
              src={photos[1].src}
              alt={photos[1].alt}
              loading="lazy"
              className="absolute right-0 bottom-0 h-[60%] w-[52%] rotate-[4deg] rounded-3xl border-[6px] border-white object-cover shadow-[0_20px_50px_rgba(0,0,0,0.18)]"
            />
          )}
          <span className="absolute bottom-6 left-2 rotate-[-6deg] rounded-full bg-white px-4 py-2 text-sm font-semibold text-rose-dark shadow-md">
            100% handmade ♡
          </span>
        </div>

        {/* Text */}
        <div className="text-center md:text-left">
          <p className="mb-2 text-xs font-bold uppercase tracking-[3px] text-charcoal/60">Our story</p>
          <h2 className="mb-5 text-[clamp(28px,4vw,40px)] leading-tight font-semibold text-charcoal">
            Every piece starts as a <span className="text-rose-dark">ball of yarn</span>
          </h2>
          <p className="mb-4 text-base leading-relaxed text-charcoal/75">
            Each item is crocheted by hand, one stitch at a time, so no two pieces are ever exactly alike.
          </p>
          <p className="mb-8 text-base leading-relaxed text-charcoal/75">
            We make every order just for you, in the size and colours you choose.
          </p>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 rounded-full border-2 border-rose-dark px-7 py-3 font-semibold text-rose-dark transition hover:bg-rose-dark hover:text-white"
          >
            Read our story <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}