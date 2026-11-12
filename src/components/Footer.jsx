import React from 'react';

/**
 * Section 12: Footer Component
 * International luxury brand footer with multi-page navigation and corporate specifications.
 */
export const Footer = () => {
  return (
    <footer className="site-footer" id="footer" aria-label="Official Footer">
      <div className="content-container">
        
        <div className="footer-top">
          
          <div className="footer-brand-col">
            <div className="footer-brand-header">
              <img src="./assets/mizuha-logo.png" alt="MIZUHA Brand Emblem" className="footer-logo-img" />
              <div className="footer-brand-text">
                <span className="footer-brand-name">MIZUHA</span>
                <span className="footer-brand-sub">India Official</span>
              </div>
            </div>
            <p className="footer-brand-quote">
              "For the love that never runs dry, we make every drop matter."
            </p>
            <p className="footer-brand-subtext">
              Premium 330ml Canned Drinking Water. Sealed in infinitely recyclable aluminium.
            </p>
          </div>

          <div className="footer-links-col">
            <h4 className="footer-col-title">Product &amp; Science</h4>
            <ul className="footer-links-list">
              <li><a href="index.html">Home</a></li>
              <li><a href="index.html#story">Our Story</a></li>
              <li><a href="why-mizuha.html">Why MIZUHA</a></li>
              <li><a href="why-mizuha.html#philosophy">Our Philosophy</a></li>
              <li><a href="why-mizuha.html#purification">Six-Stage Purification</a></li>
              <li><a href="why-mizuha.html#product">Can Specification (330ml)</a></li>
              <li><a href="why-mizuha.html#commitment">Compliance &amp; Certifications</a></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <h4 className="footer-col-title">Institutional &amp; Enquiries</h4>
            <ul className="footer-links-list">
              <li><a href="contact.html">Business Enquiries</a></li>
              <li><a href="contact.html">Hospitality Supply</a></li>
              <li><a href="contact.html">Corporate Partnerships</a></li>
              <li><a href="contact.html">Distribution Network</a></li>
              <li><a href="why-mizuha.html#commitment">Regulatory Roadmap</a></li>
            </ul>
          </div>

        </div>

        <div className="footer-bottom">
          <div className="footer-copy">
            &copy; {new Date().getFullYear()} MIZUHA India. All rights reserved. Official Brand Operations.
          </div>
          <div className="footer-legal-links">
            <span>Packaged Drinking Water</span>
            <span>&bull;</span>
            <span>330ml Infinitely Recyclable Aluminium</span>
            <span>&bull;</span>
            <span>Hermetically Sealed Purity</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
