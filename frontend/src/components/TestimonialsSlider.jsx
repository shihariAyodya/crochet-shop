'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import './TestimonialsSlider.css';

const AVATAR_COLORS = ['#c98a94', '#9caf88', '#a893c9', '#e6b223', '#C67683', '#7fa7b5'];
const AUTO_INTERVAL = 4500;

// "Amaya Perera" → "AP", "nethmi" → "N"
const initials = (name = '') =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() || '')
    .join('') || '?';

// Reviews come from the feedback you switch on in the admin page
function TestimonialsSlider({ reviews = [] }) {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);
  const timerRef = useRef(null);
  const count = reviews.length;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const startTimer = useCallback(() => {
    clearInterval(timerRef.current);
    if (count < 2) return;
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % count);
    }, AUTO_INTERVAL);
  }, [count]);

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, [startTimer]);

  if (count === 0) return null;

  const goTo = (idx) => {
    setCurrent(idx);
    startTimer();
  };

  // Where each card sits: in the middle, on the left, on the right, or hidden
  const positionOf = (i) => {
    if (i === current) return 'active';
    if (count >= 3 && i === (current - 1 + count) % count) return 'left';
    if (i === (current + 1) % count) return 'right';
    return 'hidden';
  };

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
          {reviews.map((review, i) => {
            const pos = positionOf(i);
            return (
              <div
                key={review.id}
                className={`ts-card ts-card-${pos}`}
                onClick={() => pos !== 'active' && goTo(i)}
              >
                {/* Quote icon */}
                <div className="ts-quote">❝</div>

                {/* Stars (only if they gave a rating) */}
                {review.rating ? (
                  <div className="ts-stars">
                    {Array.from({ length: 5 }, (_, si) => (
                      <span key={si} className={si < review.rating ? 'ts-star-filled' : 'ts-star-empty'}>★</span>
                    ))}
                  </div>
                ) : null}

                <p className="ts-text">{review.message}</p>

                <div className="ts-footer">
                  <div
                    className="ts-avatar"
                    style={{ background: AVATAR_COLORS[i % AVATAR_COLORS.length] }}
                  >
                    {initials(review.name)}
                  </div>
                  <p className="ts-name">{review.name}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dots */}
      {count > 1 && (
        <div className="ts-dots">
          {reviews.map((_, i) => (
            <button
              key={i}
              className={`ts-dot ${i === current ? 'active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Review ${i + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default TestimonialsSlider;