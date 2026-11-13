import React, { useState, useEffect } from 'react';
import { ExternalArrowIcon, MenuIcon, CloseIcon } from './common/Icons';

/**
 * Section 01: Header & Navigation Component
 * Supports multi-page navigation as well as separated section view switching.
 */
export const Navigation = ({ 
  isScrolled, 
  isNavRevealed, 
  activePage = 'home',
  activeTab = '',
  onSelectTab = null 
}) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
      if (window.__lenis && typeof window.__lenis.stop === 'function') {
        window.__lenis.stop();
      }
    } else {
      document.body.style.overflow = '';
      if (window.__lenis && typeof window.__lenis.start === 'function') {
        window.__lenis.start();
      }
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  const getHref = (page, hash = '') => {
    if (activePage === page) {
      return hash ? `#${hash}` : '#';
    }
    const pageHtml = page === 'home' ? 'index.html' : `${page}.html`;
    return hash ? `${pageHtml}#${hash}` : pageHtml;
  };

  const handleLinkClick = (e, page, hash = '') => {
    setIsMobileOpen(false);

    // If on why-mizuha page and switching between sections on why-mizuha page:
    if (activePage === 'why-mizuha' && page === 'why-mizuha' && hash) {
      e.preventDefault();
      if (onSelectTab) {
        onSelectTab(hash);
      } else {
        window.location.hash = `#${hash}`;
      }
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { duration: 0.6 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    // In-page smooth scroll to section (e.g. clicking Why MIZUHA / Story when already on home page)
    if (activePage === page && hash) {
      e.preventDefault();
      const targetEl = document.getElementById(hash);
      if (targetEl) {
        if (window.__lenis) {
          window.__lenis.scrollTo(targetEl, { offset: -70, duration: 1.0 });
        } else {
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
      return;
    }

    // In-page scroll to top
    if (activePage === page && !hash) {
      e.preventDefault();
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { duration: 1.0 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }
  };

  return (
    <>
      <header 
        className={`site-nav revealed ${isScrolled ? 'scrolled' : ''} ${!isNavRevealed && activePage === 'home' ? 'hero-hidden' : ''}`} 
        id="main-nav"
        aria-label="Primary Site Header"
      >
        <div className="site-nav-container">
          <a 
            href={getHref('home')} 
            className="nav-brand" 
            onClick={(e) => handleLinkClick(e, 'home')} 
            aria-label="MIZUHA Home"
          >
            <img src="./assets/mizuha-logo.png" alt="MIZUHA Brand Emblem" className="nav-logo-img" />
            <div className="nav-brand-text">
              <span className="nav-brand-name">MIZUHA</span>
              <span className="nav-brand-sub">India Official</span>
            </div>
          </a>

          <nav aria-label="Primary Navigation">
            <ul className="nav-links">
              <li>
                <a 
                  href={getHref('home', 'story')} 
                  className={`nav-link ${activePage === 'home' ? 'active' : ''}`} 
                  onClick={(e) => handleLinkClick(e, 'home', 'story')}
                >
                  Why MIZUHA
                </a>
              </li>
              <li>
                <a 
                  href={getHref('why-mizuha', 'philosophy')} 
                  className={`nav-link ${activePage === 'why-mizuha' && activeTab === 'philosophy' ? 'active' : ''}`} 
                  onClick={(e) => handleLinkClick(e, 'why-mizuha', 'philosophy')}
                >
                  Philosophy
                </a>
              </li>
              <li>
                <a 
                  href={getHref('why-mizuha', 'purification')} 
                  className={`nav-link ${activePage === 'why-mizuha' && activeTab === 'purification' ? 'active' : ''}`} 
                  onClick={(e) => handleLinkClick(e, 'why-mizuha', 'purification')}
                >
                  Purification
                </a>
              </li>
              <li>
                <a 
                  href={getHref('why-mizuha', 'product')} 
                  className={`nav-link ${activePage === 'why-mizuha' && activeTab === 'product' ? 'active' : ''}`} 
                  onClick={(e) => handleLinkClick(e, 'why-mizuha', 'product')}
                >
                  The Product
                </a>
              </li>
              <li>
                <a 
                  href={getHref('why-mizuha', 'commitment')} 
                  className={`nav-link ${activePage === 'why-mizuha' && activeTab === 'commitment' ? 'active' : ''}`} 
                  onClick={(e) => handleLinkClick(e, 'why-mizuha', 'commitment')}
                >
                  Commitment
                </a>
              </li>
            </ul>
          </nav>

          <a 
            href={getHref('contact')} 
            className="nav-cta" 
            onClick={(e) => handleLinkClick(e, 'contact')}
          >
            <span>Enquiries</span>
            <ExternalArrowIcon />
          </a>

          <button 
            className="mobile-menu-btn" 
            onClick={() => setIsMobileOpen(!isMobileOpen)} 
            aria-label="Toggle navigation menu" 
            aria-expanded={isMobileOpen}
          >
            {isMobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${isMobileOpen ? 'open' : ''}`} aria-hidden={!isMobileOpen}>
        <button
          type="button"
          className="mobile-drawer-close"
          onClick={() => setIsMobileOpen(false)}
          aria-label="Close navigation menu"
        >
          <CloseIcon />
        </button>
        <ul className="mobile-drawer-links">
          <li><a href={getHref('home')} className={`mobile-drawer-link ${activePage === 'home' ? 'active' : ''}`} onClick={(e) => handleLinkClick(e, 'home')}>Home</a></li>
          <li><a href={getHref('home', 'story')} className={`mobile-drawer-link ${activePage === 'home' ? 'active' : ''}`} onClick={(e) => handleLinkClick(e, 'home', 'story')}>Why MIZUHA</a></li>
          <li><a href={getHref('why-mizuha', 'philosophy')} className={`mobile-drawer-link ${activePage === 'why-mizuha' && activeTab === 'philosophy' ? 'active' : ''}`} onClick={(e) => handleLinkClick(e, 'why-mizuha', 'philosophy')}>Philosophy</a></li>
          <li><a href={getHref('why-mizuha', 'purification')} className={`mobile-drawer-link ${activePage === 'why-mizuha' && activeTab === 'purification' ? 'active' : ''}`} onClick={(e) => handleLinkClick(e, 'why-mizuha', 'purification')}>Purification Process</a></li>
          <li><a href={getHref('why-mizuha', 'product')} className={`mobile-drawer-link ${activePage === 'why-mizuha' && activeTab === 'product' ? 'active' : ''}`} onClick={(e) => handleLinkClick(e, 'why-mizuha', 'product')}>The Product</a></li>
          <li><a href={getHref('why-mizuha', 'commitment')} className={`mobile-drawer-link ${activePage === 'why-mizuha' && activeTab === 'commitment' ? 'active' : ''}`} onClick={(e) => handleLinkClick(e, 'why-mizuha', 'commitment')}>Commitment &amp; Compliance</a></li>
          <li><a href={getHref('contact')} className={`mobile-drawer-link ${activePage === 'contact' ? 'active' : ''}`} onClick={(e) => handleLinkClick(e, 'contact')}>Business Enquiries</a></li>
        </ul>
      </div>
    </>
  );
};

export default Navigation;
