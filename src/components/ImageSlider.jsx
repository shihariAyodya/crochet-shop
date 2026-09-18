import { useState } from 'react';
import './ImageSlider.css';

function ImageSlider({ count = 1 }) {
  const [current, setCurrent] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const goPrev = (e) => {
    e.stopPropagation();
    setCurrent((prev) => (prev === 0 ? count - 1 : prev - 1));
  };

  const goNext = (e) => {
    e.stopPropagation();
    setCurrent((prev) => (prev === count - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <div className="image-slider" onClick={() => setIsOpen(true)}>
        <div className="slider-image-placeholder">
          <span className="slider-image-label">Image {current + 1} of {count}</span>
        </div>
        <span className="slider-zoom-hint">🔍︎</span>
      </div>

      {isOpen && (
        <div className="slider-modal-overlay" onClick={() => setIsOpen(false)}>
          <button className="slider-modal-close" onClick={() => setIsOpen(false)} aria-label="Close">
            ✕
          </button>

          <div className="slider-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="slider-modal-image-placeholder">
              <span className="slider-image-label">Image {current + 1} of {count}</span>
            </div>

            {count > 1 && (
              <>
                <button className="slider-arrow slider-arrow-left" onClick={goPrev} aria-label="Previous image">
                  ‹
                </button>
                <button className="slider-arrow slider-arrow-right" onClick={goNext} aria-label="Next image">
                  ›
                </button>

                <div className="slider-dots">
                  {Array.from({ length: count }).map((_, index) => (
                    <span
                      key={index}
                      className={`slider-dot ${index === current ? 'active' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrent(index);
                      }}
                    ></span>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default ImageSlider;