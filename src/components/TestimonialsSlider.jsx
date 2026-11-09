import { useState, useEffect, useRef } from 'react';
import './TestimonialsSlider.css';

const testimonials = [
  {
    id: 1,
    name: 'Amaya P.',
    avatar: 'AP',
    avatarColor: '#c98a94',
    text: 'The quality is amazing! My scarf is so soft and the color was exactly as shown. Ordering through WhatsApp was quick and easy.',
    rating: 5,
    product: 'Striped Mesh Top',
  },
  {
    id: 2,
    name: 'Nethmi S.',
    avatar: 'NS',
    avatarColor: '#9caf88',
    text: "Bought the tote bag as a gift and my friend loved it. You can really tell it\u2019s handmade with care.",
    rating: 5,
    product: 'Granny Square Cardigan',
  },
  {
    id: 3,
    name: 'Dilki R.',
    avatar: 'DR',
    avatarColor: '#a893c9',
    text: 'Fast replies, smooth ordering process, and the crochet top fit perfectly. Will definitely order again!',
    rating: 5,
    product: 'Halter Crop Top',
  },
  {
    id: 4,
    name: 'Kavya M.',
    avatar: 'KM',
    avatarColor: '#e6b223',
    text: 'I ordered a baby dress for my niece and it was absolutely adorable. The stitching is perfect and it feels so soft.',
    rating: 5,
    product: 'Baby Dresses',
  },
  {
    id: 5,
    name: 'Shalini T.',
    avatar: 'ST',
    avatarColor: '#C67683',
    text: 'Gorgeous ocean mesh top! Perfect for the beach and got so many compliments. The color is even prettier in person.',
    rating: 5,
    product: 'Ocean Mesh Top',
  },
];

function TestimonialsSlider() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % testimonials.length);
    }, 4500);
    return () => clearInterval(timerRef.current);
  }, []);

  const goTo = (idx) => {
    clearInterval(timerRef.current);
    setCurrent(idx);
    timerRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % testimonials.length);
    }, 4500);
  };

  // Show 3 centered cards (current -1, current, current +1)
  const getVisibleIndices = () => {
    const len = testimonials.length;
    return [
      (current - 1 + len) % len,
      current,
      (current + 1) % len,
    ];
  };

  const visibleIndices = getVisibleIndices();

  return (
    <section className={`ts-section ${visible ? 'ts-visible' : ''}`} ref={sectionRef} id="testimonials">
      {/* Decorative blobs */}
      <div className="ts-blob ts-blob-1" />
      <div className="ts-blob ts-blob-2" />

      <div className="ts-header">
        <span className="ts-label">Happy Customers</span>
        <h2 className="ts-heading">What They Say</h2>
        <p className="ts-subtext">Real reviews from real customers who love our handmade pieces.</p>
      </div>

      <div className="ts-track-wrap">
        <div className="ts-track">
          {testimonials.map((review, i) => {
            const pos = visibleIndices.indexOf(i);
            const isActive = i === current;
            const isLeft = pos === 0;
            const isRight = pos === 2;
            const isHidden = pos === -1;
            return (
              <div
                key={review.id}
                className={`ts-card ${isActive ? 'ts-card-active' : ''} ${isLeft ? 'ts-card-left' : ''} ${isRight ? 'ts-card-right' : ''} ${isHidden ? 'ts-card-hidden' : ''}`}
                onClick={() => !isActive && goTo(i)}
              >
                {/* Quote icon */}
                <div className="ts-quote">❝</div>

                {/* Stars */}
                <div className="ts-stars">
                  {Array.from({ length: 5 }, (_, si) => (
                    <span key={si} className={si < review.rating ? 'ts-star-filled' : 'ts-star-empty'}>★</span>
                  ))}
                </div>

                <p className="ts-text">{review.text}</p>

                <div className="ts-footer">
                  <div
                    className="ts-avatar"
                    style={{ background: review.avatarColor }}
                  >
                    {review.avatar}
                  </div>
                  <div>
                    <p className="ts-name">{review.name}</p>
                    <p className="ts-product">Purchased: {review.product}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dots */}
      <div className="ts-dots">
        {testimonials.map((_, i) => (
          <button
            key={i}
            className={`ts-dot ${i === current ? 'active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Testimonial ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

export default TestimonialsSlider;
