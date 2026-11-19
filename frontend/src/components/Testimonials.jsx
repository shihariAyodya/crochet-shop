import './Testimonials.css';

const testimonials = [
  {
    id: 1,
    name: 'Amaya P.',
    text: 'The quality is amazing! My scarf is so soft and the color was exactly as shown. Ordering through WhatsApp was quick and easy.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Nethmi S.',
    text: 'Bought the tote bag as a gift and my friend loved it. You can really tell it\u2019s handmade with care.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Dilki R.',
    text: 'Fast replies, smooth ordering process, and the crochet top fit perfectly. Will definitely order again!',
    rating: 4,
  },
];

function Testimonials() {
  return (
    <section className="testimonials">
      <h2>What Our Customers Say</h2>
      <div className="testimonials-grid">
        {testimonials.map((review) => (
          <div className="testimonial-card" key={review.id}>
            <div className="testimonial-stars">
              {'★'.repeat(review.rating)}
              {'☆'.repeat(5 - review.rating)}
            </div>
            <p className="testimonial-text">"{review.text}"</p>
            <p className="testimonial-name">— {review.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;