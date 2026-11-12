import React from 'react';
import { SectionTag } from './common/SectionTag';

/**
 * Section 07: Quality & Purification Component
 * Extracted and aligned with https://www.mizuha.eco/why-mizuha.html
 * Features: "From tap to seal in six stages", 6-stage purification cascade,
 * and verified laboratory benchmarks (TDS 50-80 ppm, pH 7.0-7.6, 100% COA sampling).
 */
export const Purification = () => {
  const stages = [
    {
      step: '01',
      title: '5 µm Sediment',
      function: 'Mechanical pre-filtration',
      removed: 'Visible particulate, silt',
      desc: 'High-density micro-filtration capturing suspended sediment, rust, and geological particulate before deeper treatment.'
    },
    {
      step: '02',
      title: 'Activated Carbon',
      function: 'Adsorption',
      removed: 'Chlorine, chloramine, organic taste',
      desc: 'Premium activated carbon pore network adsorbing municipal chlorine, volatile organics, and off-tastes at molecular level.'
    },
    {
      step: '03',
      title: 'Softener',
      function: 'Ion exchange',
      removed: 'Calcium, magnesium hardness',
      desc: 'Precision ion-exchange softening removing excessive scaling minerals for a velvet-smooth mouthfeel.'
    },
    {
      step: '04',
      title: 'Reverse Osmosis',
      function: 'Semi-permeable membrane',
      removed: 'Dissolved solids, residual ions',
      desc: 'High-pressure semi-permeable membrane barrier rejecting dissolved impurities, heavy minerals, and microscopic solutes.'
    },
    {
      step: '05',
      title: 'Ultraviolet',
      function: '254 nm germicidal',
      removed: 'Bacteria, viruses',
      desc: 'Direct 254-nanometer UV-C radiation disrupting microbial DNA to ensure zero bacterial or viral load.'
    },
    {
      step: '06',
      title: 'Ozone',
      function: 'Residual disinfection',
      removed: 'Post-process biological re-growth',
      desc: 'Trioxygen infusion delivering sterile stability without chemical additives, reverting cleanly to pure oxygen.'
    }
  ];

  const facts = [
    {
      num: '50–80',
      unit: 'ppm',
      title: 'Total Dissolved Solids',
      desc: 'The soft, mineral-light end of the bottled-water range.',
      source: 'SGS / Intertek COA · per batch'
    },
    {
      num: '7.0 – 7.6',
      unit: 'pH',
      title: 'Final pH Balance',
      desc: 'Within the WHO 6.5–8.5 drinking water guidance and on the alkaline edge of neutral.',
      source: 'WHO · drinking water guideline'
    },
    {
      num: '100',
      unit: '%',
      title: 'Verified Batch Testing',
      desc: 'Of fills are sampled for the COA panel before release. Nothing leaves the line on a verbal pass.',
      source: 'Internal SOP · 2026'
    }
  ];

  return (
    <section className="purification-section" id="purification">
      <div className="content-container">
        
        <div className="purification-header">
          <SectionTag>Purification Cascade</SectionTag>
          
          <h2 className="serif-display purification-earth-title">
            From tap to seal in six stages.
          </h2>
          
          <h3 className="serif-display purification-trust-title">
            Zero Proprietary Well Myths. Verified Purity.
          </h3>
          
          <p className="purification-lead">
            We start with treated municipal water—fully tap-traceable, with zero proprietary well myths. 
            We pull it through a rigorous six-stage purification cascade until the chlorine, sediment, 
            and heavy minerals are entirely gone, leaving a remarkably clean, crisp profile.
          </p>
        </div>

        {/* Permitted Purification Process Diagram */}
        <div className="purification-graphic-card">
          <div className="purification-graphic-wrapper">
            <img 
              src="./assets/purification-process.webp" 
              alt="MIZUHA Official Multi-Stage Water Purification and Treatment Flow" 
              className="purification-img" 
              loading="lazy"
            />
          </div>
          <div className="purification-caption">
            <span>Verified Water Purification Architecture</span>
            <p>From tap pre-filtration through reverse osmosis to ozone disinfection & hermetic canning.</p>
          </div>
        </div>

        {/* 6-Stage Purification Cascade Grid */}
        <div className="stages-cascade stages-grid-six">
          {stages.map((stage) => (
            <div key={stage.step} className="stage-card">
              <div className="stage-card-top">
                <span className="stage-step-badge">Stage {stage.step}</span>
                <span className="stage-function-pill">{stage.function}</span>
              </div>
              <h4 className="stage-card-title">{stage.title}</h4>
              <div className="stage-removed-box">
                <span className="stage-removed-label">Target Removed:</span>
                <span className="stage-removed-value">{stage.removed}</span>
              </div>
              <p className="stage-card-desc">{stage.desc}</p>
            </div>
          ))}
        </div>

        {/* Three Laboratory Benchmark Facts from why-mizuha.html */}
        <div className="purification-facts-grid">
          {facts.map((fact, index) => (
            <div key={index} className="fact-card">
              <div className="fact-num-wrap">
                <span className="fact-num">{fact.num}</span>
                <span className="fact-unit">{fact.unit}</span>
              </div>
              <div className="fact-title">{fact.title}</div>
              <p className="fact-desc">{fact.desc}</p>
              <div className="fact-source">{fact.source}</div>
            </div>
          ))}
        </div>

        <div className="purification-trust-banner">
          <div className="trust-banner-badge">Audited Production Standard</div>
          <p className="trust-banner-text">
            "Simple, audited, and purposeful. Nothing leaves the line on a verbal pass."
          </p>
        </div>

      </div>
    </section>
  );
};

export default Purification;
