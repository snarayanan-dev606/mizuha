import React from 'react';
import { SectionTag } from './common/SectionTag';

/**
 * Section 06: Philosophy Component
 * Extracted and aligned with https://www.mizuha.eco/why-mizuha.html
 * Core Philosophy: Six-stage water. Matte-white can. One specification.
 */
export const Philosophy = () => {
  const pillars = [
    {
      num: '01',
      title: 'Tap-Traceable Sourcing',
      subtitle: 'Zero Proprietary Well Myths',
      text: 'We start with treated municipal water—fully tap-traceable, with zero proprietary well myths. Clear, honest, and verifiable origin without marketing fiction.'
    },
    {
      num: '02',
      title: 'Six-Stage Precision Cascade',
      subtitle: 'From Tap to Seal',
      text: 'We pull it through a rigorous six-stage purification cascade until the chlorine, sediment, and heavy minerals are entirely gone, leaving a remarkably clean, crisp profile.'
    },
    {
      num: '03',
      title: 'The 60-Day Circular Vessel',
      subtitle: 'Infinitely Recyclable Aluminum',
      text: 'Infinitely recyclable aluminum doesn’t just eliminate single-use plastic reliance—it delivers a vessel that can be back on the shelf as another can in sixty days.'
    },
    {
      num: '04',
      title: 'Simple, Audited, and Purposeful',
      subtitle: '100% Tested Fills',
      text: 'Sampled for laboratory COA testing before release. No verbal passes, no shortcuts. Engineered with transparency for homes, workplaces, and active lifestyles.'
    }
  ];

  return (
    <section className="philosophy-section" id="philosophy">
      <div className="content-container">
        
        <div className="philosophy-header">
          <SectionTag>Our Philosophy</SectionTag>
          <h2 className="serif-display philosophy-title">
            Six-stage water. Matte-white can. One specification.
          </h2>
          <p className="philosophy-subtitle">
            "Simple, audited, and purposeful. Pure hydration engineered with transparency."
          </p>
          <p className="philosophy-lead-copy">
            We start with treated municipal water—fully tap-traceable, with zero proprietary well myths. 
            We pull it through a rigorous six-stage purification cascade until the chlorine, sediment, and heavy minerals 
            are entirely gone, leaving a remarkably clean, crisp profile. Sealed into an infinitely recyclable 330ml aluminum can 
            finished in ultra-matte Snow White.
          </p>
        </div>

        <div className="pillars-grid">
          {pillars.map((pillar) => (
            <div key={pillar.num} className="pillar-card">
              <div className="pillar-num">{pillar.num}</div>
              <h3 className="pillar-title">{pillar.title}</h3>
              <div className="pillar-subtitle">{pillar.subtitle}</div>
              <p className="pillar-body">{pillar.text}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Philosophy;
