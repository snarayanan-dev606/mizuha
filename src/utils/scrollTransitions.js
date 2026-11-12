import { useEffect, useLayoutEffect } from 'react';

/**
 * Shared Lenis smooth scroll + scroll progress tracker.
 * Syncs Lenis directly with GSAP ScrollTrigger when available and falls back cleanly.
 */
export const initSmoothScrolling = ({ onScroll } = {}) => {
  let lenis = null;
  let rafId = null;

  if (window.Lenis) {
    lenis = new window.Lenis({
      duration: 1.35,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 0.9
    });
    window.__lenis = lenis;

    if (window.ScrollTrigger) {
      lenis.on('scroll', window.ScrollTrigger.update);
    }

    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
  }

  const handleScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;

    if (onScroll) {
      onScroll({ scrollTop, progress, isScrolled: scrollTop > 60 });
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  return () => {
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
    }
    if (lenis) {
      lenis.destroy();
      if (window.__lenis === lenis) {
        window.__lenis = null;
      }
    }
    window.removeEventListener('scroll', handleScroll);
  };
};

/**
 * Smoothly scrolls to a target element or Y position using Lenis when available.
 */
export const smoothScrollTo = (target, options = {}) => {
  if (window.__lenis) {
    window.__lenis.scrollTo(target, {
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      ...options
    });
  } else if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior: 'smooth' });
  } else if (typeof target === 'string') {
    const el = document.querySelector(target);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  } else if (target && typeof target.scrollIntoView === 'function') {
    target.scrollIntoView({ behavior: 'smooth' });
  }
};

/**
 * Choreography rules mapping selectors to transition styles & stagger groups.
 */
const SINGLE_REVEAL_RULES = [
  { selector: '.story-video-frame', variant: 'sr-fade-scale', delay: 80 },
  { selector: '.story-block', variant: 'sr-slide-right', delay: 0 },
  { selector: '.purification-graphic-card', variant: 'sr-fade-scale', delay: 80 },
  { selector: '.purification-trust-banner', variant: 'sr-fade-up', delay: 100 },
  { selector: '.product-card-visual', variant: 'sr-fade-scale', delay: 60 },
  { selector: '.product-details-col', variant: 'sr-fade-up', delay: 140 },
  { selector: '.compliance-card', variant: 'sr-fade-scale', delay: 80 },
  { selector: '.contact-info-col', variant: 'sr-fade-up', delay: 60 },
  { selector: '.contact-form-card', variant: 'sr-fade-scale', delay: 160 },
  { selector: '.statement-card', variant: 'sr-fade-scale', delay: 80 },
  { selector: '.footer-bottom', variant: 'sr-fade-up', delay: 120, onceInSession: true }
];

const STAGGER_GROUP_RULES = [
  {
    container: '.section-selector-bar',
    items: '.section-tag, h1, p, [role="tab"]',
    variant: 'sr-heading',
    staggerMs: 85,
    onceInSession: true
  },
  {
    container: '.story-header-centered',
    items: '.section-tag, .story-main-heading, .story-lead-centered, .story-verse-box',
    variant: 'sr-heading',
    staggerMs: 120
  },
  {
    container: '.philosophy-header',
    items: '.section-tag, .philosophy-title, .philosophy-subtitle, .philosophy-lead-copy',
    variant: 'sr-heading',
    staggerMs: 110
  },
  {
    container: '.purification-header',
    items: '.section-tag, .purification-earth-title, .purification-trust-title, .purification-lead',
    variant: 'sr-heading',
    staggerMs: 110
  },
  {
    container: '.product-header',
    items: '.section-tag, .product-title, .product-engineer-subtitle, .product-subtitle',
    variant: 'sr-heading',
    staggerMs: 110
  },
  {
    container: '.commitment-header',
    items: '.section-tag, .commitment-title, .commitment-subtitle',
    variant: 'sr-heading',
    staggerMs: 110
  },
  {
    container: '.why-portal-header',
    items: '.section-tag, h2, .lead, .btn-primary',
    variant: 'sr-heading',
    staggerMs: 110
  },
  {
    container: '.pillars-grid',
    items: '.pillar-card',
    variant: 'sr-card',
    staggerMs: 130
  },
  {
    container: '.stages-grid-six',
    items: '.stage-card',
    variant: 'sr-card',
    staggerMs: 105
  },
  {
    container: '.purification-facts-grid',
    items: '.fact-card',
    variant: 'sr-card',
    staggerMs: 130
  },
  {
    container: '.commitments-triad',
    items: '.commitment-card',
    variant: 'sr-card',
    staggerMs: 130
  },
  {
    container: '.compliance-table tbody',
    items: 'tr',
    variant: 'sr-slide-left',
    staggerMs: 85
  },
  {
    container: '.product-highlights-stack',
    items: '.highlight-pill',
    variant: 'sr-fade-up',
    staggerMs: 110
  },
  {
    container: '.specs-table',
    items: '.spec-row',
    variant: 'sr-slide-left',
    staggerMs: 65
  },
  {
    container: '.footer-top',
    items: '.footer-brand-col, .footer-links-col',
    variant: 'sr-fade-up',
    staggerMs: 120,
    onceInSession: true
  }
];

const ALL_SR_CLASSES = [
  'sr-ready',
  'sr-visible',
  'sr-heading',
  'sr-fade-up',
  'sr-fade-scale',
  'sr-slide-right',
  'sr-slide-left',
  'sr-card'
];

/**
 * Scroll Reveal & Continuous Parallax Engine
 * - Prepares initial hidden/offset states synchronously in useLayoutEffect (zero flicker).
 * - Smoothly reveals elements as they scroll into the viewport via IntersectionObserver + scroll safety check.
 * - Re-arms elements when scrolled well back above them so scrolling up/down stays dynamic.
 * - Drives continuous 60fps scroll-linked parallax on hero, product can, purification diagram, and ambient glows.
 */
export const useScrollReveals = (deps = []) => {
  useLayoutEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const trackedElements = [];

    const registerElement = (el, variant, delayMs, onceInSession = false) => {
      if (!el || el.dataset.srBound === 'true') return;
      if (onceInSession && el.dataset.srPlayed === 'true') return;

      el.dataset.srBound = 'true';
      el.dataset.srVariant = variant;
      el.dataset.srDelay = `${delayMs}`;
      if (onceInSession) {
        el.dataset.srOnce = 'true';
      }
      el.style.setProperty('--sr-delay', `${delayMs}ms`);
      el.classList.add('sr-ready', variant);
      trackedElements.push(el);
    };

    STAGGER_GROUP_RULES.forEach(({ container, items, variant, staggerMs, onceInSession }) => {
      document.querySelectorAll(container).forEach((containerEl) => {
        const nodeList = containerEl.querySelectorAll(items);
        nodeList.forEach((item, index) => {
          registerElement(item, variant, index * staggerMs, Boolean(onceInSession));
        });
      });
    });

    SINGLE_REVEAL_RULES.forEach(({ selector, variant, delay, onceInSession }) => {
      document.querySelectorAll(selector).forEach((el) => {
        registerElement(el, variant, delay, Boolean(onceInSession));
      });
    });

    return () => {
      trackedElements.forEach((el) => {
        el.classList.remove(...ALL_SR_CLASSES);
        el.style.removeProperty('--sr-delay');
        delete el.dataset.srBound;
        delete el.dataset.srVariant;
        delete el.dataset.srDelay;
        delete el.dataset.srOnce;
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const timers = new Map();

    const revealElement = (el) => {
      if (!el || el.classList.contains('sr-visible')) return;
      if (timers.has(el)) {
        clearTimeout(timers.get(el));
        timers.delete(el);
      }

      if (!el.classList.contains('sr-ready') && el.dataset.srVariant) {
        const delayMs = el.dataset.srDelay || '0';
        el.style.setProperty('--sr-delay', `${delayMs}ms`);
        el.classList.add('sr-ready', el.dataset.srVariant);
      }

      el.classList.add('sr-visible');
      el.dataset.srPlayed = 'true';

      const delayVal = parseInt(el.dataset.srDelay || '0', 10) || 0;
      const timerId = window.setTimeout(() => {
        // Release sr-ready once settled so native CSS :hover transforms work with zero conflict
        el.classList.remove(...ALL_SR_CLASSES);
        el.style.removeProperty('--sr-delay');
        timers.delete(el);
      }, delayVal + 1150);
      timers.set(el, timerId);
    };

    const rearmIfBelowViewport = (el, vh) => {
      if (!el || el.dataset.srOnce === 'true' || !el.dataset.srVariant) return;
      const rect = el.getBoundingClientRect();
      if (rect.top > vh + 50 && el.classList.contains('sr-ready') === false) {
        if (timers.has(el)) {
          clearTimeout(timers.get(el));
          timers.delete(el);
        }
        el.style.setProperty('--sr-delay', `${el.dataset.srDelay || '0'}ms`);
        el.classList.add('sr-ready', el.dataset.srVariant);
        observer.observe(el);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            revealElement(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.14,
        rootMargin: '0px 0px -10% 0px'
      }
    );

    const observeAll = () => {
      const candidates = document.querySelectorAll('.sr-ready');
      const vh = window.innerHeight || document.documentElement.clientHeight;

      candidates.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < vh * 0.88 && rect.bottom > 0) {
          window.setTimeout(() => {
            requestAnimationFrame(() => revealElement(el));
          }, 50);
        } else if (rect.bottom <= 0) {
          revealElement(el);
        } else {
          observer.observe(el);
        }
      });
    };

    const startRaf = requestAnimationFrame(observeAll);

    // Highlight active story block while scrolling beside sticky video
    const storyBlocks = Array.from(document.querySelectorAll('.story-block'));
    let activeObserver = null;
    if (storyBlocks.length) {
      activeObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('story-block-active');
            } else {
              entry.target.classList.remove('story-block-active');
            }
          });
        },
        {
          threshold: 0.45,
          rootMargin: '-18% 0px -18% 0px'
        }
      );
      storyBlocks.forEach((b) => activeObserver.observe(b));
    }

    // Native 60fps scroll-scrubbed parallax + fallback reveal/re-arm check
    let parallaxRaf = null;
    const updateScrollEffects = () => {
      parallaxRaf = null;
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const scrollY = window.scrollY || document.documentElement.scrollTop || 0;

      // Reveal entering elements & re-arm non-sticky elements scrolled far off the bottom
      document.querySelectorAll('[data-sr-bound="true"]').forEach((el) => {
        if (el.classList.contains('sr-ready') && !el.classList.contains('sr-visible')) {
          const rect = el.getBoundingClientRect();
          if (rect.top < vh * 0.88) {
            revealElement(el);
            observer.unobserve(el);
          }
        } else {
          rearmIfBelowViewport(el, vh);
        }
      });

      // Continuous parallax: Hero editorial lift & fade as user scrolls down
      const heroEl = document.getElementById('hero');
      const heroCopy = document.getElementById('hero-copy-overlay');
      const heroVideoWrap = document.getElementById('hero-video-container');
      if (heroEl && heroCopy) {
        const heroHeight = heroEl.offsetHeight || vh;
        const progress = Math.min(1, Math.max(0, scrollY / (heroHeight * 0.75)));
        if (heroCopy.classList.contains('revealed')) {
          heroCopy.style.transform = `translate3d(0, ${-progress * 70}px, 0)`;
          heroCopy.style.opacity = `${Math.max(0, 1 - progress * 1.25)}`;
        }
        if (heroVideoWrap) {
          heroVideoWrap.style.transform = `scale(${1 + progress * 0.08})`;
          heroVideoWrap.style.opacity = `${Math.max(0.15, 1 - progress * 0.85)}`;
        }
      }

      // Continuous parallax: Product Can & Halo float while scrolling
      const productVisual = document.querySelector('.product-card-visual');
      if (productVisual) {
        const rect = productVisual.getBoundingClientRect();
        const centerOffset = (rect.top + rect.height / 2 - vh / 2) / vh;
        const clamped = Math.max(-1, Math.min(1, centerOffset));
        const img = productVisual.querySelector('.product-featured-img');
        const halo = productVisual.querySelector('.product-halo');
        if (img) {
          img.style.transform = `translate3d(0, ${clamped * -30}px, 0)`;
        }
        if (halo) {
          halo.style.transform = `translate3d(0, ${clamped * 25}px, 0) scale(${1.05 - Math.abs(clamped) * 0.15})`;
        }
      }

      // Continuous parallax: Purification diagram subtle zoom & vertical glide
      const graphicCard = document.querySelector('.purification-graphic-card');
      if (graphicCard) {
        const rect = graphicCard.getBoundingClientRect();
        const centerOffset = (rect.top + rect.height / 2 - vh / 2) / vh;
        const clamped = Math.max(-1, Math.min(1, centerOffset));
        const img = graphicCard.querySelector('.purification-img');
        if (img) {
          img.style.transform = `translate3d(0, ${clamped * -16}px, 0) scale(${1.04 - Math.abs(clamped) * 0.04})`;
        }
      }

      // Continuous parallax: Final Statement ambient glow expansion
      const statementSection = document.querySelector('.final-statement-section');
      if (statementSection) {
        const rect = statementSection.getBoundingClientRect();
        const centerOffset = (rect.top + rect.height / 2 - vh / 2) / vh;
        const clamped = Math.max(-1, Math.min(1, centerOffset));
        const glow = statementSection.querySelector('.statement-ambient-glow');
        if (glow) {
          glow.style.transform = `translate(-50%, -50%) scale(${1.15 - Math.abs(clamped) * 0.3})`;
          glow.style.opacity = `${Math.max(0.25, 0.9 - Math.abs(clamped) * 0.55)}`;
        }
      }
    };

    const scheduleParallax = () => {
      if (parallaxRaf === null) {
        parallaxRaf = requestAnimationFrame(updateScrollEffects);
      }
    };

    window.addEventListener('scroll', scheduleParallax, { passive: true });
    scheduleParallax();

    return () => {
      cancelAnimationFrame(startRaf);
      if (parallaxRaf !== null) cancelAnimationFrame(parallaxRaf);
      window.removeEventListener('scroll', scheduleParallax);
      timers.forEach((id) => clearTimeout(id));
      timers.clear();
      observer.disconnect();
      if (activeObserver) activeObserver.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
