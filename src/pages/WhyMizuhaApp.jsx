import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import AmbientCanvas from '../components/AmbientCanvas';
import Philosophy from '../components/Philosophy';
import Purification from '../components/Purification';
import ProductExperience from '../components/ProductExperience';
import Commitment from '../components/Commitment';
import Footer from '../components/Footer';
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
    return 'why-mizuha';
  };

  const [activeTab, setActiveTab] = useState(getTabFromUrl);
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
      onScroll: ({ isScrolled: scrolled }) => {
        setIsScrolled(scrolled);
      }
    });
  }, []);

  // Re-run scroll reveal choreography whenever active isolated section changes
  useScrollReveals([activeTab]);

  const switchTab = (tabId) => {
    setActiveTab(tabId);
    if (window.history && window.history.replaceState) {
      if (tabId === 'why-mizuha') {
        window.history.replaceState(null, '', 'why-mizuha.html');
      } else {
        window.history.replaceState(null, '', `#${tabId}`);
      }
    } else {
      window.location.hash = tabId === 'why-mizuha' ? '' : `#${tabId}`;
    }
    smoothScrollTo(0, { duration: 0.6 });
  };

  return (
    <>
      <AmbientCanvas />
      <div id="scroll-progress" aria-hidden="true" />

      {/* Navigation */}
      <Navigation 
        activePage="why-mizuha"
        activeTab={activeTab}
        onSelectTab={switchTab}
        isScrolled={isScrolled}
        isNavRevealed={true}
      />

      <main style={{ paddingTop: '5.5rem' }}>
        {/* ONLY THE SELECTED SECTION IS RENDERED — NO REDUNDANT TITLE OR UNWANTED SCROLL */}
        <div className="isolated-section-container" style={{ minHeight: '65vh' }}>
          {(activeTab === 'philosophy' || activeTab === 'why-mizuha') && (
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
