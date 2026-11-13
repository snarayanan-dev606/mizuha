import React, { useState, useEffect, useRef } from 'react';
import Navigation from './components/Navigation';
import AmbientCanvas from './components/AmbientCanvas';
import HeroSection from './components/HeroSection';
import BrandStory from './components/BrandStory';
import FinalStatement from './components/FinalStatement';
import Footer from './components/Footer';
import { SectionTag } from './components/common/SectionTag';
import { ExternalArrowIcon } from './components/common/Icons';
import { initSmoothScrolling, useScrollReveals } from './utils/scrollTransitions';

/**
 * Section 13: Main Application Component (Home Page)
 * Master orchestrator connecting hero bottle animation with GSAP ScrollTrigger,
 * editorial story, and gateway to dedicated pages (Why MIZUHA, Contact).
 */
export const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeroRevealed, setIsHeroRevealed] = useState(false);
  const [isNavRevealed, setIsNavRevealed] = useState(false);

  const hasTriggeredRef = useRef(false);

  // Initialize Lenis Smooth Scrolling and scroll listeners
  useEffect(() => {
    // Ensure initial entry and reload always start at top to play intro video
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    // Clean any lingering hash on entry so the intro film always plays
    if (window.location.hash) {
      const cleanPath = window.location.pathname.endsWith('index.html') 
        ? window.location.pathname 
        : (window.location.pathname ? window.location.pathname : 'index.html');
      window.history.replaceState(null, '', cleanPath);
    }

    return initSmoothScrolling({
      onScroll: ({ scrollTop, isScrolled: scrolled }) => {
        setIsScrolled(scrolled);

        // If visitor explicitly scrolls down before video completes, reveal interface
        if (scrollTop > 80 && !hasTriggeredRef.current) {
          handleVideoEndReached();
        }
      }
    });
  }, []);

  // Choreographed Scroll Transitions & Continuous Parallax
  useScrollReveals();

  // Choreographed Reveal when Video reaches the final shot
  const handleVideoEndReached = () => {
    if (hasTriggeredRef.current) return;
    hasTriggeredRef.current = true;

    const video = document.getElementById('hero-bg-video');
    if (video) {
      video.pause();
      if (video.duration) {
        video.currentTime = Math.max(0, video.duration - 0.08);
      }
    }

    const isMobile = window.innerWidth < 900;
    const gsap = window.gsap;

    // 1. Move the video tin smoothly to the marked location on the right side
    if (gsap && video) {
      gsap.to(video, {
        x: isMobile ? '0vw' : '28vw',
        scale: isMobile ? 0.95 : 0.98,
        duration: 1.8,
        ease: 'power2.out'
      });
    }

    // 2. Set state for overlays
    setIsHeroRevealed(true);
    setIsNavRevealed(true);

    if (gsap) {
      // 3. Staggered One-By-One Reveal for Top Navigation Bar
      const navTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      navTl
        .fromTo('.nav-brand',
          { y: -18, opacity: 0, filter: 'blur(8px)' },
          { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.2, delay: 0.2 }
        )
        .fromTo('.nav-links li',
          { y: -16, opacity: 0, filter: 'blur(6px)' },
          { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.85, stagger: 0.1 },
          '-=0.8'
        )
        .fromTo('.nav-cta, .mobile-menu-btn',
          { y: -16, opacity: 0, filter: 'blur(6px)' },
          { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.0 },
          '-=0.6'
        );

      // 4. Staggered One-By-One Reveal for Hero Editorial Text
      const heroTextTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      heroTextTl
        .fromTo('#hero-copy-overlay .section-tag',
          { y: 20, opacity: 0, filter: 'blur(8px)' },
          { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.1, delay: 0.3 }
        )
        .fromTo('#hero-copy-overlay .hero-headline',
          { y: 30, opacity: 0, filter: 'blur(12px)' },
          { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.5 },
          '-=0.7'
        )
        .fromTo('#hero-copy-overlay .hero-subline',
          { y: 22, opacity: 0, filter: 'blur(8px)' },
          { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.2 },
          '-=0.9'
        )
        .fromTo('#hero-copy-overlay .hero-cta-group',
          { y: 18, opacity: 0, filter: 'blur(6px)' },
          { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.1 },
          '-=0.8'
        );
    }
  };

  // Replay Breakthrough Film
  const handleReplay = (video) => {
    hasTriggeredRef.current = false;
    setIsHeroRevealed(false);
    setIsNavRevealed(false);

    const gsap = window.gsap;

    if (gsap) {
      gsap.to(['.nav-brand', '.nav-links li', '.nav-cta', '.mobile-menu-btn'], {
        opacity: 0,
        y: -16,
        filter: 'blur(8px)',
        duration: 0.5,
        stagger: 0.04
      });

      gsap.to(['#hero-copy-overlay .section-tag', '#hero-copy-overlay .hero-headline', '#hero-copy-overlay .hero-subline', '#hero-copy-overlay .hero-cta-group'], {
        opacity: 0,
        y: 22,
        filter: 'blur(8px)',
        duration: 0.5,
        stagger: 0.04
      });

      if (video) {
        gsap.to(video, {
          x: '0vw',
          scale: 1.0,
          duration: 0.8,
          ease: 'power2.out',
          onComplete: () => {
            video.currentTime = 0;
            video.play().catch(() => {});
          }
        });
      }
    }
  };

  const whySections = [
    {
      num: '01',
      title: 'Our Philosophy',
      subtitle: 'Pure Origin & 60-Day Circularity',
      desc: 'Treated municipal water with zero proprietary well myths. Infinitely recyclable aluminum returning to shelves in 60 days.',
      link: 'why-mizuha.html#philosophy'
    },
    {
      num: '02',
      title: 'Six-Stage Purification',
      subtitle: 'Verified Laboratory Standards',
      desc: 'From sediment and carbon adsorption through reverse osmosis, UV, and ozone. TDS 50–80 ppm, pH 7.0–7.6, 100% COA testing.',
      link: 'why-mizuha.html#purification'
    },
    {
      num: '03',
      title: 'The Product',
      subtitle: '9.5g Aluminum · 330ml Slim',
      desc: 'Food-grade BPA-NI polymer lining, lightproof barrier, and PantoneLIVE matte white varnish finish.',
      link: 'why-mizuha.html#product'
    },
    {
      num: '04',
      title: 'Commitment & Standards',
      subtitle: 'Sequenced Regulatory Roadmap',
      desc: 'MeSTI, JAKIM Halal, HACCP, GMP, and ASI chain-of-custody. Zero microplastics, zero petroleum leaching.',
      link: 'why-mizuha.html#commitment'
    }
  ];

  return (
    <>
      {/* Ambient Visual Layers */}
      <AmbientCanvas />
      <div id="scroll-progress" aria-hidden="true" />

      {/* Navigation Bar */}
      <Navigation 
        activePage="home"
        isScrolled={isScrolled} 
        isNavRevealed={isNavRevealed} 
        onSelectStory={() => handleVideoEndReached()}
      />

      {/* Main Website Sections */}
      <main>
        <HeroSection 
          onVideoEndReached={handleVideoEndReached}
          isHeroRevealed={isHeroRevealed}
          onReplay={handleReplay}
        />
        
        <BrandStory />

        {/* Why MIZUHA Multi-Page Gateway Section */}
        <section className="why-portal-section" id="why-preview">
          <div className="content-container">
            <div className="why-portal-header">
              <SectionTag>Distinct Page Experience</SectionTag>
              <h2 className="serif-display">
                Why MIZUHA — The Water &amp; the Can
              </h2>
              <p className="lead">
                Six-stage water. Matte-white can. One specification. Explore the engineering, six-stage filtration cascade, and certified standards in our dedicated section-by-section experience.
              </p>
              <a href="why-mizuha.html" className="btn-primary">
                <span>Explore Full Why MIZUHA Page</span>
                <ExternalArrowIcon />
              </a>
            </div>

            <div className="pillars-grid">
              {whySections.map((item) => (
                <a 
                  key={item.num} 
                  href={item.link} 
                  className="pillar-card" 
                  style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}
                >
                  <div className="pillar-num">{item.num}</div>
                  <h3 className="pillar-title">{item.title}</h3>
                  <div className="pillar-subtitle">{item.subtitle}</div>
                  <p className="pillar-body">{item.desc}</p>
                  <div style={{ marginTop: 'auto', paddingTop: '1.2rem', fontSize: '0.8rem', color: 'var(--accent-blue-soft)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span>View Section</span>
                    <span>&rarr;</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <FinalStatement />
      </main>

      {/* Brand Footer */}
      <Footer />
    </>
  );
};

export default App;
