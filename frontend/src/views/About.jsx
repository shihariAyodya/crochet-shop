import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';
import { GiYarn } from 'react-icons/gi';
import {
  FiArrowRight,
  FiHeart,
  FiFeather,
  FiGift,
  FiStar,
  FiMapPin,
  FiClock,
  FiSliders,
} from 'react-icons/fi';
import { WHATSAPP_LINK } from '../lib/site';
import './About.css';

const STEPS = [
  {
    title: 'You choose',
    text: 'Pick a piece you love, then choose your size and colour. Want something a little different? Just ask.',
  },
  {
    title: 'We crochet it',
    text: 'Your piece is crocheted by hand, stitch by stitch, using soft, good quality yarn.',
  },
  {
    title: 'Finishing touches',
    text: 'Every seam, edge and strap is checked so it looks neat and feels comfortable to wear.',
  },
  {
    title: 'Sent to you',
    text: 'It is packed with care and on its way to you, ready to wear, gift or treasure.',
  },
];

const VALUES = [
  {
    icon: FiHeart,
    title: 'Made to order',
    text: 'Nothing sits on a shelf. Each piece is made after you order it, just for you.',
  },
  {
    icon: FiStar,
    title: 'One of a kind',
    text: 'Because everything is handmade, no two pieces are ever exactly the same.',
  },
  {
    icon: FiFeather,
    title: 'Your way',
    text: 'Custom colours, sizes and small design changes are always welcome.',
  },
  {
    icon: FiGift,
    title: 'Small and slow',
    text: 'A small Sri Lankan brand that values careful craft over mass production.',
  },
];

function About() {
  return (
    <div className="ab">
      {/* ── Intro (text only) ── */}
      <section className="ab-hero">
        <div className="ab-blob ab-blob-1" />
        <div className="ab-blob ab-blob-2" />

        <div className="ab-hero-inner">
          <span className="ab-eyebrow">Our story</span>
          <h1 className="ab-title">
            Made by hand, <span>made for you</span>
          </h1>
          <p className="ab-sub">
            Shizelle is a small crochet brand from Sri Lanka. Every top, dress and accessory is
            crocheted by hand and made to order, in the size and colour you choose.
          </p>

          {/* Little "stitched" divider */}
          <div className="ab-stitch" aria-hidden="true">
            <span className="ab-stitch-line" />
            <GiYarn className="ab-stitch-icon" />
            <span className="ab-stitch-line" />
          </div>

          <ul className="ab-facts">
            <li>
              <FiMapPin /> Handmade in Sri Lanka
            </li>
            <li>
              <FiClock /> Made to order
            </li>
            <li>
              <FiSliders /> Your size, your colour
            </li>
          </ul>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="ab-process">
        <div className="ab-section-head">
          <span className="ab-eyebrow">Our process</span>
          <h2 className="ab-h2">How your piece is made</h2>
          <p>From your first message to the moment it arrives, here is what happens.</p>
        </div>

        <ol className="ab-steps">
          {STEPS.map((s, i) => (
            <li key={s.title} className="ab-step">
              <span className="ab-step-num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ── Why handmade ── */}
      <section className="ab-values">
        <div className="ab-section-head">
          <span className="ab-eyebrow">Why handmade</span>
          <h2 className="ab-h2">
            A personal touch you <span>can feel</span>
          </h2>
          <p>
            Machine-made clothes are made by the thousand. Handmade crochet is made one at a time,
            with a person behind every stitch.
          </p>
        </div>

        <div className="ab-value-grid">
          {VALUES.map(({ icon: Icon, title, text }) => (
            <div key={title} className="ab-value">
              <span className="ab-value-icon">
                <Icon />
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Closing call to action ── */}
      <section className="ab-cta">
        <div className="ab-cta-inner">
          <h2>Ready to find your piece?</h2>
          <p>Browse the collection, or message us about a custom order.</p>
          <div className="ab-actions ab-actions-center">
            <Link href="/products" className="ab-btn ab-btn-light">
              View products <FiArrowRight />
            </Link>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="ab-btn ab-btn-outline">
              <FaWhatsapp /> Message on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;