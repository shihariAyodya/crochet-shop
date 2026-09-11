import { useState } from 'react';
import './RateUs.css';

function RateUs() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [sent, setSent] = useState(false);

  const handleRate = (star) => {
    setRating(star);

    const message = `Hi! I'd like to rate CrochetOn: ${'★'.repeat(star)}${'☆'.repeat(5 - star)}`;
    window.open(`https://wa.me/94705924972?text=${encodeURIComponent(message)}`, '_blank');

    setSent(true);
  };

  return (
    <section className="rate-us">
      <h3>Enjoyed Shopping With Us?</h3>
      <p>Tap a star to send us your rating</p>

      <div className="rate-us-stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`rate-us-star ${star <= (hoverRating || rating) ? 'filled' : ''}`}
            onClick={() => handleRate(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
          >
            ★
          </span>
        ))}
      </div>

      {sent && <p className="rate-us-thanks">Thank you for your rating! 💛</p>}
    </section>
  );
}

export default RateUs;