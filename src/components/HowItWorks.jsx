import { Link } from 'react-router-dom';

const steps = [
  {
    icon: '🧶',
    title: 'Pick your piece',
    text: 'Browse the collection and find something you love.',
  },
  {
    icon: '🎨',
    title: 'Choose size & colour',
    text: 'Add as many size and colour combinations as you like.',
  },
  {
    icon: '💬',
    title: 'Order on WhatsApp',
    text: 'Your order is sent to us in one tap. We confirm and start crocheting.',
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-sage-light px-5 py-16 lg:py-20">
      <div className="mx-auto max-w-[1100px]">
        <p className="mb-2 text-center text-xs font-bold uppercase tracking-[3px] text-sage-dark">
          Simple &amp; personal
        </p>
        <h2 className="mb-12 text-center text-[clamp(28px,4vw,40px)] font-semibold text-charcoal">
          How Ordering Works
        </h2>

        <ol className="relative grid gap-10 md:grid-cols-3 md:gap-8">
          {/* Dashed line joining the steps (desktop only) */}
          <div
            aria-hidden="true"
            className="absolute top-10 right-[16%] left-[16%] hidden border-t-2 border-dashed border-sage md:block"
          />

          {steps.map((s, i) => (
            <li key={s.title} className="relative flex flex-col items-center text-center">
              <div className="relative mb-5 flex size-20 items-center justify-center rounded-full bg-white text-4xl shadow-[0_8px_24px_rgba(113,140,90,0.18)]">
                {s.icon}
                <span className="absolute -top-1 -right-1 flex size-7 items-center justify-center rounded-full bg-rose text-sm font-bold text-white">
                  {i + 1}
                </span>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-charcoal">{s.title}</h3>
              <p className="max-w-[260px] text-[15px] leading-relaxed text-charcoal/70">{s.text}</p>
            </li>
          ))}
        </ol>

        <div className="mt-12 text-center">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 rounded-full bg-sage-dark px-8 py-3.5 font-semibold text-white shadow-[0_8px_20px_rgba(113,140,90,0.3)] transition hover:-translate-y-0.5 hover:bg-charcoal"
          >
            Start shopping <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}