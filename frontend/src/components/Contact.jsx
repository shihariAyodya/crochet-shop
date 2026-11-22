'use client';

import { useState } from 'react';
import './Contact.css';
import { FaWhatsapp, FaFacebookF, FaArrowRight } from 'react-icons/fa';
import { FiPlus } from 'react-icons/fi';
import { MdEmail } from 'react-icons/md';
import { WHATSAPP_LINK } from '../lib/site';
import { getSupabaseBrowser } from '../lib/supabase/client';

const contactOptions = [
  {
    key: 'whatsapp',
    href: WHATSAPP_LINK,
    external: true,
    icon: <FaWhatsapp />,
    title: 'WhatsApp',
    text: 'Chat with us directly',
  },
  {
    key: 'facebook',
    href: 'https://www.facebook.com/profile.php?id=100094735062949',
    external: true,
    icon: <FaFacebookF />,
    title: 'Facebook',
    text: 'Follow our latest pieces',
  },
  {
    key: 'email',
    href: 'mailto:crocheton1@gmail.com',
    external: false,
    icon: <MdEmail />,
    title: 'Email',
    text: 'crocheton1@gmail.com',
  },
];

const ratingWords = ['', 'Poor', 'Okay', 'Good', 'Great', 'Loved it!'];

// Shown on the Contact page instead of the feedback form
const faqs = [
  {
    q: 'How do I place an order?',
    a: 'Open the Products page, pick a piece, choose your size and colour, then tap "Order on WhatsApp". We will confirm the details with you there.',
  },
  {
    q: 'Can I ask for a custom colour or size?',
    a: 'Yes! Every piece is made to order, so custom colours, sizes and small design changes are welcome. Just message us with what you have in mind.',
  },
  {
    q: 'Which size should I choose?',
    a: 'Each product page has a size chart. If you are between sizes or not sure, send us your measurements and we will help you pick.',
  },
  {
    q: 'How long does my order take?',
    a: 'Because each piece is crocheted by hand after you order, it takes a little time. We will tell you how long your piece will take when you order.',
  },
  {
    q: 'How do I pay and receive my order?',
    a: 'Once your order is confirmed on WhatsApp, we will share the payment and delivery details with you.',
  },
];

/**
 * variant="home" (default): contact options + feedback form
 * variant="page": contact options + questions (used on the Contact page)
 */
function Contact({ variant = 'home' }) {
  const isPage = variant === 'page';
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSending(true);

    const { error: saveError } = await getSupabaseBrowser()
      .from('feedback')
      .insert({
        name: name.trim(),
        rating: rating || null,
        message: message.trim(),
      });

    setSending(false);

    if (saveError) {
      console.error('Could not send feedback:', saveError.message);
      setError('Sorry, something went wrong. Please try again or message us on WhatsApp.');
      return;
    }

    setSubmitted(true);
    setName('');
    setMessage('');
    setTimeout(() => {
      setSubmitted(false);
      setRating(0);
    }, 4000);
  };

  const shownRating = hoverRating || rating;

  return (
    <section className={`ct ${isPage ? 'ct-page' : ''}`} id="contact">
      <div className="ct-blob ct-blob-1" aria-hidden="true" />
      <div className="ct-blob ct-blob-2" aria-hidden="true" />

      <div className="ct-inner">
        {/* ── Left: contact options ── */}
        <div className="ct-info">
          <span className="ct-eyebrow">Contact us</span>
          {isPage ? (
            <h1 className="ct-title">
              Get in <span>touch</span>
            </h1>
          ) : (
            <h2 className="ct-title">
              Get in <span>touch</span>
            </h2>
          )}
          <p className="ct-sub">
            Have a question or want a custom order? Reach out directly. We'd love to hear from you.
          </p>

          <div className="ct-cards">
            {contactOptions.map((o) => (
              <a
                key={o.key}
                href={o.href}
                className={`ct-card ct-card-${o.key}`}
                {...(o.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                <span className="ct-card-icon">{o.icon}</span>
                <span className="ct-card-text">
                  <span className="ct-card-title">{o.title}</span>
                  <span className="ct-card-sub">{o.text}</span>
                </span>
                <span className="ct-card-arrow" aria-hidden="true"><FaArrowRight /></span>
              </a>
            ))}
          </div>

          <p className="ct-note">
            <span className="ct-dot" aria-hidden="true" />
            We usually reply within a few hours
          </p>
        </div>

        {isPage ? (
          /* ── Right: common questions ── */
          <div className="ct-form-card ct-faq">
            <span className="ct-eyebrow">Good to know</span>
            <h3 className="ct-form-title">Common questions</h3>

            <div className="ct-faq-list">
              {faqs.map((f, i) => (
                <details key={f.q} className="ct-faq-item" open={i === 0}>
                  <summary>
                    {f.q}
                    <FiPlus className="ct-faq-icon" aria-hidden="true" />
                  </summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>

            <p className="ct-faq-more">
              Still have a question?{' '}
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                Ask us on WhatsApp
              </a>
            </p>
          </div>
        ) : (
          /* ── Right: feedback form ── */
          <div className="ct-form-card">
            {submitted ? (
              <div className="ct-success">
                <span className="ct-success-icon">✓</span>
                <h4>Thank you!</h4>
                <p>Your feedback has been sent.</p>
              </div>
            ) : (
              <>
                <span className="ct-eyebrow">Your thoughts</span>
                <h3 className="ct-form-title">Leave feedback</h3>

                <form onSubmit={handleSubmit} className="ct-form">
                  <input
                    className="ct-input"
                    type="text"
                    placeholder="Your name"
                    maxLength={100}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />

                  <div className="ct-rating">
                    <span className="ct-rating-label">
                      {shownRating ? ratingWords[shownRating] : 'Rate us'}
                    </span>
                    <div className="ct-stars" onMouseLeave={() => setHoverRating(0)}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          aria-label={`${star} star${star > 1 ? 's' : ''}`}
                          className={`ct-star ${star <= shownRating ? 'active' : ''}`}
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>

                  <textarea
                    className="ct-input ct-textarea"
                    rows="4"
                    placeholder="Tell us what you think..."
                    maxLength={2000}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />

                  {error && <p className="ct-error">{error}</p>}

                  <button type="submit" className="ct-submit" disabled={sending}>
                    {sending ? 'Sending...' : <>Send feedback <FaArrowRight /></>}
                  </button>
                </form>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default Contact;