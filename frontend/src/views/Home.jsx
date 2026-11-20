'use client';

import { useEffect } from 'react';
import HeroSlider from '../components/HeroSlider';
import WhyUs from '../components/WhyUs';
import FeaturedProducts from '../components/FeaturedProducts';
import HowItWorks from '../components/HowItWorks';
import StoryTeaser from '../components/StoryTeaser';
import TestimonialsSlider from '../components/TestimonialsSlider';
import RateUs from '../components/RateUs';
import Contact from '../components/Contact';
import Reveal from '../components/Reveal';

function Home({ products = [] }) {
  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    scrollToHash();
    window.addEventListener('hashchange', scrollToHash);
    return () => window.removeEventListener('hashchange', scrollToHash);
  }, []);

  return (
    <>
      <HeroSlider />
      <Reveal><FeaturedProducts products={products} /></Reveal>
      <Reveal><HowItWorks /></Reveal>
      <Reveal><WhyUs /></Reveal>
      <Reveal><StoryTeaser products={products} /></Reveal>
      <Reveal><TestimonialsSlider /></Reveal>
      <Reveal><RateUs /></Reveal>
      <Reveal><Contact /></Reveal>
    </>
  );
}

export default Home;
