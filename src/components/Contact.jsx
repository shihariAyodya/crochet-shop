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
    <section className="contact" id="contact">
      <div className="contact-container-home">
        
        {/* Left side: Contact Cards */}
        <div className="contact-info-home">
          <h2>Get In Touch</h2>
          <p className="contact-subtext">
            Have a question or want a custom order? Reach out directly — we'd love to hear from you.
          </p>
          
          <div className="contact-options-home">
            <a href="https://wa.me/+94705122847" target="_blank" rel="noopener noreferrer" className="contact-card-home">
              <FaWhatsapp className="contact-icon whatsapp" />
              <div>
                <h3>WhatsApp</h3>
                <p>Chat with us directly</p>
              </div>
            </a>
            
            <a href="https://www.facebook.com/profile.php?id=100094735062949" target="_blank" rel="noopener noreferrer" className="contact-card-home">
              <FaFacebook className="contact-icon facebook" />
              <div>
                <h3>Facebook</h3>
                <p>Follow our latest pieces</p>
              </div>
            </a>

            <a href="mailto:crocheton1@gmail.com" className="contact-card-home">
              <MdEmail className="contact-icon email" />
              <div>
                <h3>Email</h3>
                <p>crocheton1@gmail.com</p>
              </div>
            </a>
          </div>
        </div>

        {/* Right side: Feedback Form */}
        <div className="contact-form-home">
          <h3>Leave Feedback</h3>
          {submitted ? (
            <div className="home-success-message">
              <span className="success-icon">✨</span>
              <h4>Thank You!</h4>
              <p>Your feedback has been sent.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="home-contact-form">
              <div className="home-form-group">
                <input type="text" placeholder="Your Name" required />
              </div>
              
              <div className="home-form-group home-rating-group">
                <label>Rate us</label>
                <div className="home-stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      className={`home-star ${star <= (hoverRating || rating) ? 'active' : ''}`}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div className="home-form-group">
                <textarea rows="3" placeholder="Tell us what you think..." required></textarea>
              </div>

              <button type="submit" className="home-submit-btn">Send Feedback</button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export default Contact;