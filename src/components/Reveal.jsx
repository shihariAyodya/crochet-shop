import { useEffect, useRef, useState } from 'react';

/**
 * Fades + slides its children up the first time they scroll into view.
 * Turned off automatically for people who prefer reduced motion.
 *
 * <Reveal><FeaturedProducts /></Reveal>
 * <Reveal delay={150}>...</Reveal>
 */
export default function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition duration-700 ease-out motion-reduce:transition-none ${
        shown ? 'translate-y-0 opacity-100' : 'motion-safe:translate-y-6 motion-safe:opacity-0'
      } ${className}`}
    >
      {children}
    </div>
  );
}