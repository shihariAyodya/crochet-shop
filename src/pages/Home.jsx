import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import HeroSlider from '../components/HeroSlider';
import WhyUs from '../components/WhyUs';
import FeaturedProducts from '../components/FeaturedProducts';
import HowItWorks from '../components/HowItWorks';
import StoryTeaser from '../components/StoryTeaser';
import TestimonialsSlider from '../components/TestimonialsSlider';
import RateUs from '../components/RateUs';
import Contact from '../components/Contact';
import Reveal from '../components/Reveal';

function Home() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [hash]);

  return (
    <>
      <HeroSlider />
      <Reveal><FeaturedProducts /></Reveal>
      <Reveal><HowItWorks /></Reveal>
      <Reveal><WhyUs /></Reveal>
      <Reveal><StoryTeaser /></Reveal>
      <Reveal><TestimonialsSlider /></Reveal>
      <Reveal><RateUs /></Reveal>
      <Reveal><Contact /></Reveal>
    </>
  );
}

export default Home;