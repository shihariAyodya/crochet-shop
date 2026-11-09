import { useState } from 'react';
import './Contact.css';
import { FaWhatsapp, FaFacebook } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

function Contact() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="contact-page">
      {/* Header */}
      <div className="contact-header">
        <h1>Get in Touch</h1>
        <p>We'd love to hear from you. Drop us a message or leave some feedback!</p>
      </div>

      <div className="contact-container">
        {/* Contact Info */}
        <div className="contact-info">
          <h2>Contact Information</h2>
          <p>Have questions about your order or our crochet pieces?</p>
          <div className="info-items">
            <div className="info-item">
              <div className="icon"><FaWhatsapp className="react-icon whatsapp" /></div>
              <div>
                <strong>WhatsApp</strong>
                <a href="https://wa.me/94705924972" target="_blank" rel="noreferrer">+94 70 592 4972</a>
              </div>
            </div>
            <div className="info-item">
              <div className="icon"><FaFacebook className="react-icon facebook" /></div>
              <div>
                <strong>Facebook</strong>
                <a href="https://www.facebook.com/profile.php?id=100094735062949" target="_blank" rel="noreferrer">@crocheton_store</a>
              </div>
            </div>
            <div className="info-item">
              <div className="icon"><MdEmail className="react-icon email" /></div>
              <div>
                <strong>Email</strong>
                <a href="mailto:crocheton1@gmail.com">crocheton1@gmail.com</a>
              </div>
            </div>
          </div>
        </div>

        {/* Feedback / Contact Form */}
        <div className="contact-form-card">
          <h2>Send us a Message & Feedback</h2>
          {submitted ? (
            <div className="success-message">
              <span className="success-icon">✨</span>
              <h3>Thank You!</h3>
              <p>Your message and feedback have been sent successfully.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label>Your Name</label>
                <input type="text" placeholder="Jane Doe" required />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" placeholder="jane@example.com" required />
              </div>
              
              <div className="form-group rating-group">
                <label>Rate your experience</label>
                <div className="stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      className={`star ${star <= (hoverRating || rating) ? 'active' : ''}`}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>Your Message / Feedback</label>
                <textarea rows="4" placeholder="Tell us what you think..." required></textarea>
              </div>

              <button type="submit" className="submit-btn">Send Message</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Contact;
