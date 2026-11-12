import React from 'react';
import { ArrowIcon } from './common/Icons';
import { smoothScrollTo } from '../utils/scrollTransitions';

/**
 * Section 10: Final Statement Component
 * Cinematic closing statement creating an emotional and philosophical summary of MIZUHA.
 */
export const FinalStatement = () => {
  const handleScrollToContact = (e) => {
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      e.preventDefault();
      smoothScrollTo(contactEl, { duration: 1.3 });
    }
  };

  return (
    <section className="final-statement-section" id="statement">
      <div className="statement-ambient-glow" />
      <div className="content-container">
        <div className="statement-card">
          <span className="statement-tag">An Invitation to Purity</span>
          
          <h2 className="serif-display statement-heading">
            A promise of care, poured with love, protected by design.
          </h2>

          <p className="statement-body">
            MIZUHA is more than water. It is a daily reminder that the best things in life are simple, pure, and cared for.
          </p>

          <div className="statement-callout">
            <span className="statement-quote-mark">“</span>
            <p className="statement-quote-text">Make Every Drop Count.</p>
          </div>

          <div className="statement-action">
            <a href="contact.html" className="btn-primary" onClick={handleScrollToContact}>
              <span>Begin Your Partnership</span>
              <ArrowIcon />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalStatement;

