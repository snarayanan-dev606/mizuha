import React from 'react';
import { SectionTag } from './common/SectionTag';

/**
 * Section 09: Commitment & Sustainability Component
 * Extracted and aligned with https://www.mizuha.eco/why-mizuha.html
 * Features: "Compliance is sequenced", official certification roadmap (MeSTI, Halal, HACCP, GMP, ASI),
 * and the 3 circular environmental pillars.
 */
export const Commitment = () => {
  const complianceSteps = [
    {
      month: 'M0–3',
      name: 'MeSTI',
      fullName: 'Makanan Selamat Tanggungjawab Industri',
      status: 'Mandatory · Fastest',
      statusType: 'solid',
      note: 'Foundational food safety assurance certified under the Ministry of Health Malaysia.'
    },
    {
      month: 'M3–6',
      name: 'JAKIM Halal',
      fullName: 'Via MYe-HALAL Portal',
      status: 'In Progress · 15–30 Days',
      statusType: 'progress',
      note: 'Confirmed Halal exclusions: zero bone-char filtration media, zero animal-derived processing aids (per MPPHM 2020).'
    },
    {
      month: 'M3–6',
      name: 'HACCP & ISO 22000',
      fullName: 'Food Safety Management Systems',
      status: 'Co-Packer-Owned',
      statusType: 'neutral',
      note: 'Comprehensive hazard analysis and critical control points managed by accredited manufacturing partners.'
    },
    {
      month: 'M6–12',
      name: 'GMP',
      fullName: 'Good Manufacturing Practice',
      status: 'Co-Packer-Owned',
      statusType: 'neutral',
      note: 'Rigorous sanitary standards for bottling and hermetic aluminium seam integrity.'
    },
    {
      month: 'M12+',
      name: 'ASI Certification',
      fullName: 'Aluminium Stewardship Initiative',
      status: 'Aspirational · Year 2',
      statusType: 'future',
      note: 'Global chain-of-custody verification guaranteeing ethically and sustainably mined aluminium.'
    }
  ];

  const commitments = [
    {
      num: '01',
      title: 'Infinitely Recyclable (60-Day Loop)',
      body: 'Aluminium is infinitely recyclable without degradation of quality or integrity. A can recycled today can be back on store shelves as a new can in sixty days.'
    },
    {
      num: '02',
      title: 'Zero Microplastics & BPA-NI',
      body: 'By eliminating single-use PET plastic bottles, we ensure zero microplastic shedding, zero bisphenol contamination, and zero petroleum leaching into drinking water.'
    },
    {
      num: '03',
      title: 'Audited Tap-Traceable Water',
      body: 'Every fill is drawn from municipal water with complete chain of custody and zero proprietary well myths, verified by SGS/Intertek COA before release.'
    }
  ];

  return (
    <section className="commitment-section" id="commitment">
      <div className="content-container">
        
        <div className="commitment-header">
          <SectionTag>Sustainability & Compliance</SectionTag>
          <h2 className="serif-display commitment-title">
            Compliance is sequenced.
          </h2>
          <p className="commitment-subtitle">
            "Simple, audited, and purposeful. All certificates are filed under Mizuha Eco Solutions Sdn Bhd."
          </p>
        </div>

        {/* Sequenced Certification Table / Roadmap */}
        <div className="compliance-card">
          <div className="compliance-header">
            <span className="compliance-tag">Regulatory Roadmap</span>
            <h3 className="compliance-card-title">Sequenced Compliance & Quality Certifications</h3>
          </div>

          <div className="compliance-table-wrapper">
            <table className="compliance-table">
              <thead>
                <tr>
                  <th style={{ width: '15%' }}>Timeline</th>
                  <th style={{ width: '30%' }}>Certification</th>
                  <th style={{ width: '25%' }}>Status</th>
                  <th style={{ width: '30%' }}>Verification Scope</th>
                </tr>
              </thead>
              <tbody>
                {complianceSteps.map((step, idx) => (
                  <tr key={idx}>
                    <td className="compliance-month-cell" data-label="Timeline">{step.month}</td>
                    <td data-label="Certification">
                      <strong className="compliance-name">{step.name}</strong>
                      <span className="compliance-subname">{step.fullName}</span>
                    </td>
                    <td data-label="Status">
                      <span className={`compliance-status-chip ${step.statusType}`}>
                        {step.status}
                      </span>
                    </td>
                    <td className="compliance-note-cell" data-label="Scope">{step.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="compliance-footnote">
            <p>
              All certificates are filed under <strong>Mizuha Eco Solutions Sdn Bhd</strong> and published as they are issued. 
              Halal exclusions: no bone-char filtration media, no animal-derived processing aids — confirmed in writing to JAKIM per MPPHM 2020.
            </p>
          </div>
        </div>

        {/* Triad of Core Commitments */}
        <div className="commitments-triad mt-8">
          {commitments.map((item) => (
            <div key={item.num} className="commitment-card">
              <span className="commitment-num">{item.num}</span>
              <h3 className="commitment-card-title">{item.title}</h3>
              <p className="commitment-card-body">{item.body}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Commitment;
