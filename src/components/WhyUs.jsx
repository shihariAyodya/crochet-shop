import { useEffect, useRef, useState } from 'react';
import './WhyUs.css';

const features = [
  { icon: '🧶', title: '100% Handmade', desc: 'Every piece is crafted by hand with care and love in Sri Lanka.' },
  { icon: '🌿', title: 'Eco Yarn', desc: 'We use soft, sustainable cotton yarn — gentle on skin and planet.' },
  { icon: '🎨', title: 'Custom Colors', desc: 'Pick your favorite color or request a custom shade for any item.' },
  { icon: '💬', title: 'WhatsApp Orders', desc: 'Simple, personal ordering — chat with us directly for a seamless experience.' },
];

function WhyUs() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={`why-us ${visible ? 'why-visible' : ''}`} ref={ref}>
      <div className="why-inner">
        {features.map((f, i) => (
          <div className="why-item" key={i} style={{ '--item-delay': `${i * 100}ms` }}>
            <div className="why-icon">{f.icon}</div>
            <h3 className="why-title">{f.title}</h3>
            <p className="why-desc">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WhyUs;
