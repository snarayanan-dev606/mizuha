import React, { useEffect, useRef } from 'react';
import { SectionTag } from './common/SectionTag';

/**
 * Section 05: Brand Story Component
 * Features sticky 50% left showcase video (full vertical 9:16 aspect ratio, zero top/bottom cropping, never scrolls)
 * and pure black (#000000) background exactly matching the tin video footage seamlessly.
 */
export const BrandStory = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // High performance: only play and decode showcase video when approaching viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: '200px 0px 200px 0px'
      }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="brand-story-section" id="story">
      
      {/* Top Editorial Header Container */}
      <div className="story-header-container">
        <div className="content-container">
          <div className="story-header-centered">
            <SectionTag>Editorial Story</SectionTag>
            <h2 className="serif-display story-main-heading">
              For the Love That Never Runs Dry
            </h2>
            <p className="lead story-lead-centered">
              Water is never just water. It is a quiet testament to the promises that protect and sustain every family.
            </p>
            <div className="story-verse-box story-verse-centered">
              <div className="story-block-num">Approved Core Mission</div>
              <blockquote className="story-closing-statement">
                "For the love that never runs dry, we make every drop matter."
              </blockquote>
            </div>
          </div>
        </div>
      </div>

      {/* EXACT MATCH PURE BLACK (#000000) BACKGROUND ZONE — Matches the tin video seamlessly */}
      <div className="story-black-zone">
        <div className="content-container">
          
          <div className="story-split-grid">
            
            {/* Left Column (50%): Video is Sticky / Fixed in place and never scrolls */}
            <div className="story-video-col">
              <div className="story-video-frame">
                <video 
                  ref={videoRef}
                  id="story-can-video" 
                  className="story-video-element" 
                  muted 
                  loop 
                  playsInline 
                  preload="metadata"
                  aria-label="MIZUHA 300ml Canned Water Showcase Film"
                >
                  <source src="./assets/mizuha-can-showcase.mp4" type="video/mp4" />
                </video>
              </div>
            </div>

            {/* Right Column (50%): Scrolling 4 Message Blocks */}
            <div className="story-scroll-col">
              
              {/* Point 01 */}
              <article className="story-block">
                <div className="story-block-num">01 / Everyday Promises</div>
                <p className="story-paragraph">
                  Every home is built on love, care and promises.
                </p>
                <p className="story-paragraph">
                  A promise to protect our families.<br />
                  A promise to give our children a brighter tomorrow.<br />
                  A promise to stand by honesty and integrity.<br />
                  A promise to never take the essentials of life for granted.
                </p>
              </article>

              {/* Point 02 */}
              <article className="story-block">
                <div className="story-block-num">02 / The Moments That Matter</div>
                <p className="story-paragraph">
                  Some promises are spoken. The most meaningful ones are reflected in the little things we do every day.
                </p>
                <p className="story-paragraph">
                  <strong>And water is one of them.</strong>
                </p>
                <p className="story-paragraph">
                  It is the first sip that welcomes a new morning, the bottle packed for a child's school day, the glass offered to a guest and the water shared around the family table. It quietly supports the moments that matter most.
                </p>
              </article>

              {/* Point 03 */}
              <article className="story-block">
                <div className="story-block-num">03 / Utmost Responsibility</div>
                <p className="story-paragraph">
                  Yet, what makes every sip trustworthy often goes unseen — the source of the water, the purification process, the quality checks and the care taken before it reaches your home.
                </p>
                <p className="story-paragraph">
                  We believe that something so essential to everyday life deserves nothing less than our utmost responsibility.
                </p>
                <p className="story-paragraph">
                  Our vision is to build a drinking water brand rooted in trust, purity and uncompromising quality. A brand where quality is not just a promise printed on a bottle, but a commitment reflected in every process and every drop.
                </p>
              </article>

              {/* Point 04 */}
              <article className="story-block">
                <div className="story-block-num">04 / Our Purpose & Responsibility</div>
                <p className="story-paragraph">
                  Our purpose is simple: to bring dependable drinking water closer to every home, while honouring the trust families place in us.
                </p>
                <p className="story-paragraph">
                  <strong>Because water is never just water.</strong>
                </p>
                <p className="story-paragraph">
                  It is care for the people we love. It is a part of our everyday lives. And it is a responsibility we carry with pride.
                </p>
              </article>

            </div>

          </div>

        </div>
      </div>

    </section>
  );
};

export default BrandStory;
