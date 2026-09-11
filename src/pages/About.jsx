import './About.css';

function About() {
  return (
    <section className="about">
      <div className="about-hero">
        <h1>Our Story</h1>
        <p className="about-tagline">Handmade with love, one stitch at a time.</p>
      </div>

      <div className="about-content">
        <div className="about-block">
          <h2>How It Started</h2>
          <p>
            CrochetOn began as a small passion project — turning a love for crochet into
            handmade pieces that bring warmth and character to everyday life. Every item is
            made by hand, with care taken in every stitch.
          </p>
        </div>

        <div className="about-block">
          <h2>Our Process</h2>
          <p>
            Each piece is crocheted individually using quality yarn, meaning no two items are
            ever perfectly identical — that's the beauty of handmade work. From choosing the
            colors to the final stitch, everything is done with intention and care.
          </p>
        </div>

        <div className="about-block">
          <h2>Why Handmade</h2>
          <p>
            In a world of mass production, handmade crochet carries a personal touch that
            machine-made items simply can't replicate. Supporting handmade means supporting
            small, sustainable craftsmanship.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;