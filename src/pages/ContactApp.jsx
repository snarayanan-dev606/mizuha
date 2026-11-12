import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import AmbientCanvas from '../components/AmbientCanvas';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import { initSmoothScrolling, useScrollReveals } from '../utils/scrollTransitions';

/**
 * Dedicated Contact & Enquiries Page
 * Matches official brand contact structure with institutional inquiries,
 * distribution network info, and verified contact points.
 */
export const ContactApp = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    return initSmoothScrolling({
      onScroll: ({ progress, isScrolled: scrolled }) => {
        setScrollProgress(progress);
        setIsScrolled(scrolled);
      }
    });
  }, []);

  useScrollReveals();

  return (
    <>
      <AmbientCanvas />
      <div id="scroll-progress" style={{ width: `${scrollProgress}%` }} aria-hidden="true" />

      <Navigation 
        activePage="contact"
        isScrolled={isScrolled}
        isNavRevealed={true}
      />

      <main style={{ paddingTop: '6rem' }}>
        <ContactSection />
      </main>

      <Footer />
    </>
  );
};

export default ContactApp;

