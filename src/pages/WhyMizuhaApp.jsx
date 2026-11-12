import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import AmbientCanvas from '../components/AmbientCanvas';
import Philosophy from '../components/Philosophy';
import Purification from '../components/Purification';
import ProductExperience from '../components/ProductExperience';
import Commitment from '../components/Commitment';
import Footer from '../components/Footer';
import { SectionTag } from '../components/common/SectionTag';
import { initSmoothScrolling, smoothScrollTo, useScrollReveals } from '../utils/scrollTransitions';

/**
 * Why MIZUHA Dedicated Page — Separated Section Views
 * Each section (Philosophy, Purification, The Product, Commitment) is rendered individually
 * so the user can focus on that specific section without scrolling through all sections at once.
 */
export const WhyMizuhaApp = ({ initialSection }) => {
  const validTabs = ['philosophy', 'purification', 'product', 'commitment'];

  const getTabFromUrl = () => {
    if (initialSection && validTabs.includes(initialSection)) {
      return initialSection;
    }
    const hash = (window.location.hash || '').replace('#', '').toLowerCase();
    if (validTabs.includes(hash)) {
      return hash;
    }
    const path = window.location.pathname.toLowerCase();
    for (const tab of validTabs) {
      if (path.includes(tab)) return tab;
    }
    return 'philosophy';
  };

  const [activeTab, setActiveTab] = useState(getTabFromUrl);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  // Synchronize on hashchange
  useEffect(() => {
    const handleHashChange = () => {
      const tab = getTabFromUrl();
      setActiveTab(tab);
      smoothScrollTo(0, { duration: 0.9 });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Initialize Lenis Smooth Scrolling once and track progress
  useEffect(() => {
    return initSmoothScrolling({
      onScroll: ({ progress, isScrolled: scrolled }) => {
        setScrollProgress(progress);
        setIsScrolled(scrolled);
      }
    });
  }, []);

  // Re-run scroll reveal choreography whenever active isolated section changes
  useScrollReveals([activeTab]);

  const switchTab = (tabId) => {
    setActiveTab(tabId);
    window.location.hash = `#${tabId}`;
    smoothScrollTo(0, { duration: 0.9 });
  };

  const tabsMeta = [
    {
      id: 'philosophy',
      num: '01',
      label: 'Philosophy',
      sub: 'Pure Origin & Purpose'
    },
    {
      id: 'purification',
      num: '02',
      label: 'Purification',
      sub: '6-Stage Cascade'
    },
    {
      id: 'product',
      num: '03',
      label: 'The Product',
      sub: '330ml Can Specs'
    },
    {
      id: 'commitment',
      num: '04',
      label: 'Commitment',
      sub: 'Sequenced Compliance'
    }
  ];

  return (
    <>
      <AmbientCanvas />
      <div id="scroll-progress" style={{ width: `${scrollProgress}%` }} aria-hidden="true" />

      {/* Navigation */}
      <Navigation 
        activePage="why-mizuha"
        activeTab={activeTab}
        onSelectTab={switchTab}
        isScrolled={isScrolled}
        isNavRevealed={true}
      />

      <main style={{ paddingTop: '5.5rem' }}>
        {/* Editorial Sub-Navigation Bar for Distinct Section Selection */}
        <section className="section-selector-bar">
          <div className="content-container">
            <div className="section-selector-header">
              <SectionTag>Separate Section Explorer</SectionTag>
              <h1 className="serif-display section-selector-title">
                Why MIZUHA
              </h1>
              <p className="section-selector-desc">
                Select a specific section below to explore its details individually without scrolling through everything at once.
              </p>
            </div>

            {/* Prominent Tab Switcher Cards */}
            <div 
              role="tablist" 
              aria-label="Why MIZUHA Sections"
              className="section-tablist"
            >
              {tabsMeta.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => switchTab(tab.id)}
                    type="button"
                    className={`section-tab-card ${isActive ? 'active' : ''}`}
                  >
                    <div className="section-tab-top">
                      <span className="section-tab-num">
                        {tab.num}
                      </span>
                      {isActive && (
                        <span className="section-tab-indicator" />
                      )}
                    </div>
                    <div className="section-tab-label">
                      {tab.label}
                    </div>
                    <div className="section-tab-sub">
                      {tab.sub}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ONLY THE SELECTED SECTION IS RENDERED — NO LONG UNWANTED SCROLL */}
        <div className="isolated-section-container" style={{ minHeight: '65vh' }}>
          {activeTab === 'philosophy' && (
            <div className="tab-pane-fade" key="philosophy">
              <Philosophy />
            </div>
          )}

          {activeTab === 'purification' && (
            <div className="tab-pane-fade" key="purification">
              <Purification />
            </div>
          )}

          {activeTab === 'product' && (
            <div className="tab-pane-fade" key="product">
              <ProductExperience />
            </div>
          )}

          {activeTab === 'commitment' && (
            <div className="tab-pane-fade" key="commitment">
              <Commitment />
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default WhyMizuhaApp;
