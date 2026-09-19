import './Contact.css';
import { FaWhatsapp, FaFacebook } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

function Contact() {
  return (
    <section className="contact" id="contact">
      <h2>Get In Touch</h2>
      <p className="contact-subtext">
        Have a question or want a custom order? Reach out directly — we'd love to hear from you.
      </p>

      <div className="contact-options">
        
          <a href="https://wa.me/+94705122847"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-card"
        >
          <FaWhatsapp className="contact-icon whatsapp" />
          <h3>WhatsApp</h3>
          <p>Chat with us directly</p>
        </a>

        
          <a href="https://www.facebook.com/profile.php?id=100094735062949"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-card"
        >
          <FaFacebook className="contact-icon facebook" />
          <h3>Facebook</h3>
          <p>Follow our latest pieces</p>
        </a>

        <a href="mailto:crocheton1@gmail.com" className="contact-card">
          <MdEmail className="contact-icon email" />
          <h3>Email</h3>
          <p>crocheton1@gmail.com</p>
        </a>
      </div>
    </section>
  );
}

export default Contact;