import React, { useEffect, useRef } from 'react';
import { SectionTag } from './common/SectionTag';
import { ArrowIcon, RefreshIcon } from './common/Icons';
import { smoothScrollTo } from '../utils/scrollTransitions';

/**
 * Section 04: Hero Component
 * Cinematic Breakthrough sequence featuring the earth emergence film,
 * smooth transition to the right hero column, staggered editorial reveal, and replay control.
 */
export const HeroSection = ({ onVideoEndReached, isHeroRevealed, onReplay }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Explicitly guarantee intro video starts from 0 on initial page entry
    video.currentTime = 0;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {});
    }

    const handleTimeUpdate = () => {
      // Trigger smooth emergence reveal at the final shot of the film
      if (video.duration && video.currentTime >= video.duration - 0.28) {
        onVideoEndReached();
      }
    };

    const handleEnded = () => {
      onVideoEndReached();
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    // Pause hero video when scrolled out of view to free up GPU decoder and prevent lag
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            video.pause();
          } else if (!isHeroRevealed) {
            video.play().catch(() => {});
          }
        });
      },
      { threshold: 0.02 }
    );

    observer.observe(video);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
      observer.disconnect();
    };
  }, [onVideoEndReached, isHeroRevealed]);

  const handleReplayClick = () => {
    const video = videoRef.current;
    if (video) {
      onReplay(video);
    }
  };

  const handleDiscoverClick = (e) => {
    e.preventDefault();
    const storyEl = document.getElementById('story');
    if (storyEl) {
      smoothScrollTo(storyEl, { duration: 1.35 });
    }
  };

  return (
    <section className="hero-section" id="hero">
      {/* Full-Viewport Breakthrough Video Background */}
      <div className="hero-video-bg-container" id="hero-video-container">
        <video 
          ref={videoRef}
          id="hero-bg-video" 
          className="hero-bg-video" 
          autoPlay 
          muted 
          playsInline 
          preload="auto"
        >
          <source src="./assets/mizuha-hero-breakthrough.mp4" type="video/mp4" />
        </video>
        <div className={`hero-bg-overlay ${isHeroRevealed ? 'active' : ''}`} aria-hidden="true" />
      </div>

      {/* Hero Content Grid (Left Editorial + Right Product Column) */}
      <div className="hero-content-wrapper">
        
        {/* Left Column: Editorial Headline & Actions */}
        <div className={`hero-left-editorial ${isHeroRevealed ? 'revealed' : ''}`} id="hero-copy-overlay">
          <SectionTag>Cinematic Breakthrough</SectionTag>
          
          <h1 className="serif-display hero-headline">
            Where the Earth Reveals<br />
            <span className="highlight">Its Hidden Treasure</span>
          </h1>

          <p className="hero-subline">
            Pure Water. A Promise That Matters.<br />
            <span>Every drop carries a promise of care, quality and trust.</span>
          </p>

          <div className="hero-cta-group">
            <a href="#story" className="btn-primary" onClick={handleDiscoverClick}>
              <span>Discover Our Promise</span>
              <ArrowIcon />
            </a>

            <button 
              type="button" 
              id="replay-btn" 
              className="btn-outline" 
              onClick={handleReplayClick} 
              aria-label="Replay Breakthrough Film"
            >
              <RefreshIcon />
              <span>Replay Emergence</span>
            </button>
          </div>
        </div>

        {/* Right Column: Hero Product Stage (Direct Target Location for Background Video Can) */}
        <div className="hero-right-space" id="hero-right-target" aria-hidden="true" />

      </div>

      {/* Downward Scroll Indicator */}
      <a 
        href="#story" 
        className={`scroll-indicator ${isHeroRevealed ? 'revealed' : ''}`} 
        onClick={handleDiscoverClick} 
        aria-label="Scroll down to explore story"
      >
        <div className="scroll-indicator-line" />
        <span>Scroll to Explore</span>
      </a>
    </section>
  );
};

export default HeroSection;

