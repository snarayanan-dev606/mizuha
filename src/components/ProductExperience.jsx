import React, { useState } from 'react';
import { SectionTag } from './common/SectionTag';

/**
 * Section 08: Product Experience Component
 * Extracted and aligned with https://www.mizuha.eco/why-mizuha.html
 * Features: "9.5 grams of aluminum. The vessel that comes back.",
 * "A can you can spec like an engineer", dual Mechanical & Chemical + Water Profile tables,
 * and PantoneLIVE matte-finish packaging details.
 */
export const ProductExperience = () => {
  const [activeTab, setActiveTab] = useState('mechanical');

  const mechanicalSpecs = [
    { label: 'Volume', value: '330 ml' },
    { label: 'Body / Wall Thickness', value: '110 / 415 µm' },
    { label: 'Empty Weight', value: '≈ 9.5 g' },
    { label: 'Format', value: 'Standard slim, double-wall' },
    { label: 'End / Lid', value: 'B64 · 202 dia. stay-on tab' },
    { label: 'Internal Lining', value: 'FDA-approved polymer · BPA-NI' },
    { label: 'Recycled Content (launch)', value: '≥ 50% PCR aluminum' },
    { label: 'Recycled Content (Y2 target)', value: '≥ 70% PCR aluminum' }
  ];

  const waterSpecs = [
    { label: 'Total Dissolved Solids', value: '50–80 ppm' },
    { label: 'pH Range', value: '7.0–7.6' },
    { label: 'Bacterial & Viral Load', value: 'Nil (UV + Ozone)' },
    { label: 'Heterotrophic Plate Count', value: 'Per COA · batch verified' },
    { label: 'Heavy Metals (Pb, As, Hg, Cd)', value: '< WHO drinking limits' },
    { label: 'Stability (12 mo / 24 mo)', value: 'Tested · third-party audited' },
    { label: 'Shelf Life', value: '24 months' },
    { label: 'Allergen / Ingredient', value: 'Water only' }
  ];

  const highlights = [
    {
      title: 'PantoneLIVE Matte-White Varnish',
      desc: 'Print is a matte varnish over a white base coat, ink-matched to the PantoneLIVE Matte Aluminum Beverage Can library so SKUs hit production accurately, not approximately.'
    },
    {
      title: 'FDA Food-Grade BPA-NI Lining',
      desc: 'Internal lining is a food-grade polymer that is BPA-NI (BPA non-intent, not present in formulation), guaranteeing 100% microplastic-free hydration.'
    },
    {
      title: 'The Vessel That Comes Back',
      desc: 'Infinitely recyclable double-wall aluminum designed to return from the recycling loop to retail shelves as a new can in sixty days.'
    }
  ];

  return (
    <section className="product-section" id="product">
      <div className="content-container">
        
        <div className="product-header">
          <SectionTag>Product Specifications</SectionTag>
          <h2 className="serif-display product-title">
            9.5 grams of aluminum. The vessel that comes back.
          </h2>
          <h3 className="serif-display product-engineer-subtitle">
            A can you can spec like an engineer.
          </h3>
          <p className="product-subtitle">
            A 330 ml standard slim, double-wall, with a 64 mm B64 end and a 202-diameter stay-on tab. 
            Internal lining is a FDA-approved food-grade polymer that is BPA-NI — BPA non-intent, not present in the formulation.
          </p>
        </div>

        <div className="product-stage-container">
          
          {/* Left Column: Visual Can Showcase Card */}
          <div className="product-card-visual">
            <div className="product-img-wrapper">
              <img 
                src="./assets/can-isolated.webp" 
                alt="MIZUHA 330ml Aluminium Drinking Water Can" 
                className="product-featured-img" 
                loading="lazy"
              />
              <div className="product-halo" />
            </div>
            <div className="product-badge-flag">330ml Standard Slim · 9.5g Aluminum</div>
          </div>

          {/* Right Column: Technical Spec Table & Feature Highlights */}
          <div className="product-details-col">
            
            {/* Interactive Engineering Spec Tab Switcher */}
            <div className="spec-tab-switcher" role="tablist">
              <button 
                type="button" 
                className={`spec-tab-btn ${activeTab === 'mechanical' ? 'active' : ''}`}
                onClick={() => setActiveTab('mechanical')}
              >
                Mechanical & Chemical
              </button>
              <button 
                type="button" 
                className={`spec-tab-btn ${activeTab === 'water' ? 'active' : ''}`}
                onClick={() => setActiveTab('water')}
              >
                Water Profile
              </button>
            </div>

            <div className="specs-table">
              {(activeTab === 'mechanical' ? mechanicalSpecs : waterSpecs).map((item, idx) => (
                <div key={idx} className="spec-row">
                  <span className="spec-label">{item.label}</span>
                  <span className="spec-value mono-val">{item.value}</span>
                </div>
              ))}
            </div>

            <div className="product-highlights-stack">
              {highlights.map((h, i) => (
                <div key={i} className="highlight-pill">
                  <h4 className="highlight-title">{h.title}</h4>
                  <p className="highlight-desc">{h.desc}</p>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default ProductExperience;
